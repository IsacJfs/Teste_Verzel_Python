import io
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
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
)
models.Base.metadata.create_all(bind=database.engine)

@app.get("/vehicles/", response_model=List[schemas.Vehicle])
def read_vehicles(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    vehicles = crud.get_vehicles(db, skip=skip, limit=limit)
    return vehicles

@app.post("/vehicles/", response_model=schemas.Vehicle)
def create_vehicle(
    vehicle: schemas.VehicleCreate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return crud.create_vehicle(db=db, vehicle=vehicle, current_user=current_user)

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
