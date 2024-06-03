from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    full_name = Column(String)
    email = Column(String)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)

    vehicles = relationship("Vehicle", back_populates="user")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, ForeignKey("modelos_carro.id"), index=True)
    brand_id = Column(Integer, ForeignKey("marcas_carros.id"), index=True)
    price = Column(Float)
    year = Column(Integer)
    location = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="vehicles")
    images = relationship("VehicleImage", back_populates="vehicle")
    # model_car = relationship("ModelCar", back_populates="vehicles")
    # brand_car = relationship("BrandCar", back_populates="vehicles")

class BrandCar(Base):
    __tablename__ = "marcas_carros"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True)

class ModelCar(Base):
    __tablename__ = "modelos_carro"

    id = Column(Integer, primary_key=True, index=True)
    idmarca = Column(Integer, ForeignKey("marcas_carros.id"))
    nome = Column(String, index=True)
    marca = relationship("BrandCar", back_populates="models")

BrandCar.models = relationship("ModelCar", back_populates="marca")

class VehicleImage(Base):
    __tablename__ = "vehicle_images"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    image = Column(BYTEA)
    vehicle = relationship("Vehicle", back_populates="images")
