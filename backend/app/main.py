from fastapi import FastAPI, Depends, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, database, auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens. Altere para uma lista específica de origens se necessário.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
    allow_origin_regex="http?://.*"
)
models.Base.metadata.create_all(bind=database.engine)

app.include_router(auth.router, prefix="/auth")

@app.get("/vehicles/", response_model=List[schemas.Vehicle])
def read_vehicles(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    return vehicles

@app.get("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def read_vehicle(vehicle_id: int, db: Session = Depends(database.get_db)):
    db_vehicle = crud.get_vehicle(db, id_vehicle=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@app.post("/vehicles/", response_model=schemas.Vehicle)
def create_vehicle(
    vehicle: schemas.VehicleBase, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return crud.create_vehicle(db=db, vehicle=vehicle, current_user=current_user)


@app.delete("/vehicles/{vehicle_id}", response_model=schemas.Vehicle)
def delete_vehicle(vehicle_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.delete_vehicle(db=db, id_vehicle=vehicle_id, current_user=current_user)

@app.post("/vehicle_images/", response_model=schemas.VehicleImage)
async def create_vehicle_image(vehicle_id: int, image: UploadFile = File(...), db: Session = Depends(database.get_db)):
    vehicle_image = schemas.VehicleImageCreate(vehicle_id=vehicle_id, image=image)
    return await crud.create_vehicle_image(db=db, vehicle_image=vehicle_image)

@app.get("/vehicle_images/{image_id}", response_model=schemas.VehicleImage)
def read_vehicle_image(image_id: int, db: Session = Depends(database.get_db)):
    db_image = crud.get_vehicle_image(db, image_id=image_id)
    if db_image is None:
        raise HTTPException(status_code=404, detail="Vehicle image not found")
    return db_image

@app.delete("/vehicle_images/{image_id}", response_model=schemas.VehicleImage)
def delete_vehicle_image(image_id: int, db: Session = Depends(database.get_db)):
    db_image = crud.get_vehicle_image(db, image_id=image_id)
    if db_image is None:
        raise HTTPException(status_code=404, detail="Vehicle image not found")
    return crud.delete_vehicle_image(db=db, image_id=image_id)


@app.get("/brands/", response_model=List[schemas.BrandCar])
def read_brands(db: Session = Depends(database.get_db)):
    return crud.get_brands(db)

@app.get("/brands/{marca_id}/models/", response_model=List[schemas.ModelCar])
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
