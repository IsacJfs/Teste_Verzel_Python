from fastapi import UploadFile
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class VehicleBase(BaseModel):
    name: str
    brand: str
    model: str
    photo: UploadFile
    price: float
    year: int
    location: str


class Vehicle(VehicleBase):
    id: int
    photo: str
    user_name: str

    class Config:
        orm_mode = True

class BrandBase(BaseModel):
    nome: str

class BrandCreate(BrandBase):
    pass

class Brand(BrandBase):
    id: int

    class Config:
        orm_mode = True

class ModelBase(BaseModel):
    nome: str
    idmarca: int

class ModelCreate(ModelBase):
    pass

class Model(ModelBase):
    id: int

    class Config:
        orm_mode = True
