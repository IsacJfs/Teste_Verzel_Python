from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from PIL import Image
import io
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
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_vehicles(db: Session, id: int):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.user_id == id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return schemas.Vehicle(
        **vehicle.__dict__, user_name=vehicle.user.full_name
    )

def delete_vehicle(db: Session, id: int, current_user: models.User):
    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == id).first()
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

    img = Image.open(vehicle.photo)
    img = img.resize((800, 600), Image.ANTIALIAS)
    img_bytes = io.BytesIO()
    img.save(img_bytes, format="JPEG")

    db_vehicle = models.Vehicle(
        **vehicle.dict(exclude={"photo"}),
        photo=img_bytes.getvalue(),
        user_id=current_user.id
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def get_brands(db: Session):
    return db.query(models.BrandCar).all()

def get_models_by_brands(db: Session, marca_id: int):
    return db.query(models.ModelCar).filter(models.ModelCar.idmarca == marca_id).all()
