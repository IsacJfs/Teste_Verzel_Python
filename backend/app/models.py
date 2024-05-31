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