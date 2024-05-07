from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from api.models import TodoItemDB, TodoItem, TodoItemCreate, Base
from api.database import engine, SessionLocal
from fastapi.staticfiles import StaticFiles


app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos/", response_model=TodoItem)
def create_todo(todo: TodoItemCreate, db: Session = Depends(get_db)):
    db_todo = TodoItemDB(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/todos/", response_model=list[TodoItem])
def read_todos(db: Session = Depends(get_db)):
    return db.query(TodoItemDB).all()

@app.get("/todos/{todo_id}", response_model=TodoItem)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(TodoItemDB).filter(TodoItemDB.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db.query(TodoItemDB).filter(TodoItemDB.id == todo_id).delete()
    db.commit()
    return {"ok": True}

@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, todo: TodoItemCreate, db: Session = Depends(get_db)):
    db_todo = db.query(TodoItemDB).filter(TodoItemDB.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    for var, value in vars(todo).items():
        setattr(db_todo, var, value)
    db.commit()
    return db_todo


app.mount("/static", StaticFiles(directory="static",html=True), name="static")



## CORS middleware if needed
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8008)