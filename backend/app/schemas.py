from pydantic import BaseModel

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
