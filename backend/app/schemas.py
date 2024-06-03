from fastapi import UploadFile
from pydantic import BaseModel
from typing import List

class UserBase(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserCreate(UserBase):
    hashed_password: str

class User(UserBase):
    id: int
    vehicles: List["Vehicle"] = []

    class Config:
        orm_mode = True

class VehicleBase(BaseModel):
    model_id: int
    brand_id: int
    price: float
    year: int
    location: str


class Vehicle(VehicleBase):
    id: int
    user_id: int
    images: List["VehicleImage"] = []

    class Config:
        orm_mode = True

class VehicleCreate(VehicleBase):
    model_id: int
    brand_id: int
    price: float
    year: int
    location: str

class BrandBase(BaseModel):
    nome: str

class BrandCreate(BrandBase):
    pass

class BrandCar(BrandBase):
    id: int
    models: List["ModelCar"] = []
    vehicle: List["Vehicle"] = []

    class Config:
        orm_mode = True

class ModelBase(BaseModel):
    nome: str
    idmarca: int

class ModelCreate(ModelBase):
    pass

class ModelCar(ModelBase):
    id: int
    marca: BrandCar
    Vehicle: List["Vehicle"] = []

    class Config:
        orm_mode = True

class VehicleImageBase(BaseModel):
    vehicle_id: int
    image:UploadFile

class VehicleImageCreate(BaseModel):
    vehicle_id: int
    image: UploadFile

class VehicleImage(VehicleImageBase):
    id: int

    class Config:
        orm_mode = True