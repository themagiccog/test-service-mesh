from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel as PydanticBaseModel

Base = declarative_base()

class TodoItemDB(Base):
    __tablename__ = "todoitems"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    completed = Column(Boolean, default=False)

class TodoItemBase(PydanticBaseModel):
    title: str
    description: str
    completed: bool = False

# Additional Pydantic models for Request and Response
class TodoItemCreate(TodoItemBase):
    pass

class TodoItem(TodoItemBase):
    id: int

class Config:
    orm_mode = True
