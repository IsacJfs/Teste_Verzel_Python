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
    photo: str
    price: float
    year: int
    location: str

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int

    class Config:
        orm_mode = True
