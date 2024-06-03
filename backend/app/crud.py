from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username, 
        email=user.email,
        full_name=user.full_name, 
        hashed_password=hashed_password,
        disabled=user.disabled
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_vehicles(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Vehicle).offset(skip).limit(limit).all()

def get_vehicle(db: Session, vehicle_id: int):
    return db.query(models.Vehicle).filter(models.Vehicle.id == vehicle_id).first()

def delete_vehicle(db: Session, id_vehicle: int, current_user: models.User):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == id_vehicle).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    if vehicle.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this vehicle"
        )
    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}

def create_vehicle(db: Session, vehicle: schemas.VehicleBase, current_user: models.User):
    db_vehicle = models.Vehicle(
        model_id=vehicle.model_id,
        brand_id=vehicle.brand_id,
        price=vehicle.price,
        year=vehicle.year,
        location=vehicle.location,
        user_id=current_user.id
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def get_brands(db: Session):
    return db.query(models.BrandCar).all()

def get_models_by_brands(db: Session, marca_id: int):
    return db.query(models.ModelCar).filter(models.ModelCar.brand_id == marca_id).all()

def get_vehicle_image(db: Session, image_id: int):
    return db.query(models.VehicleImage).filter(models.VehicleImage.id == image_id).first()

async def create_vehicle_image(db: Session, vehicle_image: schemas.VehicleImageCreate):
    content = await vehicle_image.image.read()
    db_image = models.VehicleImage(
        vehicle_id=vehicle_image.vehicle_id,
        image=content
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image
