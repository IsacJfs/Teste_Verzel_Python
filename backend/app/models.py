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

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    model = Column(String, index=True)
    brand = Column(String)
    version = Column(String)
    photo = Column(BYTEA)
    price = Column(Float)
    year = Column(Integer)
    location = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="vehicles")

User.vehicles = relationship("Vehicle", back_populates="user")

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
