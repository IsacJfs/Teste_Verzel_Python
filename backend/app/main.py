import io
from fastapi import FastAPI, Depends, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, database, auth

app = FastAPI()

origins = [
    "http://localhost:5137",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Altere para uma lista específica de origens se necessário.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
    allow_origin_regex="http?://.*"
)
models.Base.metadata.create_all(bind=database.engine)

@app.get("/vehicles/", response_model=List[schemas.Vehicle])
def read_vehicles(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    return vehicles

@app.post("/vehicles/", response_model=schemas.Vehicle)
def create_vehicle(
    vehicle: schemas.VehicleBase, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return crud.create_vehicle(db=db, vehicle=vehicle, current_user=current_user)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        return JSONResponse(status_code=400, content={"message": "Invalid file type"})
    try:
        contents = await file.read()
        
        return {"filename": file.filename, "length": len(contents)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
    finally:
        await file.close()
        
@app.get("/vehicles/{id}/photo")
def get_vehicle_photo(id: int, db: Session = Depends(database.get_db)):
    db_vehicle = crud.get_vehicle(db, id=id)
    return FileResponse(
        io.BytesIO(db_vehicle.photo),
        media_type="image/jpeg",
        filename=f"{db_vehicle.model}_{db_vehicle.id}.jpg",
    )

@app.delete("/vehicles/{id}")
def delete_vehicle(
    id: int, 
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.delete_vehicle(db, id, current_user)

app.include_router(auth.router, prefix="/auth")

@app.get("/brands/", response_model=List[schemas.Brand])
def read_brands(db: Session = Depends(database.get_db)):
    return crud.get_brands(db)

@app.get("/brands/{marca_id}/models/", response_model=List[schemas.Model])
def read_models_by_brands(marca_id: int, db: Session = Depends(database.get_db)):
    return crud.get_models_by_brands(db, marca_id)

class CustomException(Exception):
    def __init__(self, message: str, status_code: int):
        self.message = message
        self.status_code = status_code
        
@app.exception_handler(CustomException)
async def unicorn_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message},
    )

@app.post("/create-vehicle/")
async def create_vehicle(
        name: str = Form(...), 
        model: str = Form(...), 
        brand: str = Form(...), 
        year: int = Form(...), 
        price: float = Form(...), 
        location: str = Form(...),
        photo: UploadFile = File(...),
        current_user: models.User = Depends(auth.get_current_user),
        db: Session = Depends(database.get_db)):
    
    if not photo.content_type.startswith('image/'):
        return JSONResponse(status_code=400, content={"message": "Invalid photo type"})
    try:
        photo_contents = await photo.read()

        vehicle_data = schemas.VehicleBase(
            name=name,
            model=model,
            brand=brand,
            year=year,
            price=price,
            location=location,
            photo=photo_contents  
        )

        vehicle = crud.create_vehicle(db=db, vehicle=vehicle_data, current_user=current_user)
        return {
            "name": vehicle.name,
            "model": vehicle.model,
            "photo_length": len(photo_contents),
            "photo_filename": photo.filename
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
    finally:
        await photo.close()