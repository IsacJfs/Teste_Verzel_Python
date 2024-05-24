from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String)
    model = Column(String)
    photo = Column(String)
    price = Column(Float)
