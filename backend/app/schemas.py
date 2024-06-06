from pydantic import BaseModel
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from .models import Vehicle, VehicleImage, BrandCar, ModelCar

class UserBase(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    vehicles: List["Vehicle"] = []

    class Config:
        orm_mode = True

class VehicleBase(BaseModel):
    car_model_id: int
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
    car_model_id: int
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

    class Config:
        orm_mode = True

class ModelBase(BaseModel):
    nome: str
    idmarca: int

class ModelCreate(ModelBase):
    pass

class ModelCar(ModelBase):
    id: int
    # brand_id: int

    class Config:
        orm_mode = True

class VehicleImageBase(BaseModel):
    vehicle_id: int
    image_name: str
    image_ext: str
    image_content: str

class VehicleImageCreate(VehicleImageBase):
    pass

class VehicleImage(VehicleImageBase):
    id: int

    class Config:
        orm_mode = True