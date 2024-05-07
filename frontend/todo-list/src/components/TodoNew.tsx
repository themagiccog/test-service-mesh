import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8008';


interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

function TodoAdd(){
  // We utilize 'useState' below. For more: https://react.dev/learn#updating-the-screen)
  const [newTodo, setNewTodo] = useState<TodoItem>({ id: 0, title: '', description: '', completed: false }); // note the initial values

  const navigate = useNavigate();
  
  // function to add item in todo
  const addTodo = async () => {
      if (newTodo) {
          await axios.post(`${API_URL}/todos/`, newTodo);
          setNewTodo({ id: 0, title: '', description: '', completed: false }); // clear the input fields, i.e. set newTodo back to default after adding new item
          //fetchTodos();
          navigate('/', {replace: true});
      }
  };

  return (
    <>
      <div className="m-3">
        <HomeButton ></HomeButton>
        <form className="m-3">
          <div >
              <label htmlFor="todoTitle" className="form-label">Title</label>
              <input 
                  type="text" 
                  className="form-control mb-3" 
                  id="todoTitle" 
                  placeholder="Add a new todo"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} 
              />
          </div>
          <div className="mb-3">
              <label htmlFor="todoDescription" className="form-label">Description</label>
              <textarea 
                  className="form-control mb-3" 
                  id="todoDescription"  
                  placeholder="Enter task description" 
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} 
              />
          </div>
          <div className="form-check mb-3">
              <label className="form-check-label" htmlFor="todoComplete">Completed</label>
              <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="todoComplete"
                  checked={newTodo.completed}
                  onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })} 
              />
          </div>
          <button type="button" className="btn btn-primary mb-3" onClick={addTodo}>Add Todo</button>
        </form>  
      </div>
    </>
  );

};

export default TodoAdd;

