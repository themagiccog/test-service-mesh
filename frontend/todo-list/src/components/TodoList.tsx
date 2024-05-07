import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'xhttp://localhostx:8008';


interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// Can use: "function FunctionName() {}" or "const FunctionName () => {}"
function TodoList() {
    console.log(`The URL is: ${API_URL}`)
    // We utilize 'useState' below. For more: https://react.dev/learn#updating-the-screen)
    const [allTodos, setAllTodos] = useState<TodoItem[]>([]); // this is for getting list of all todo items

    //For more: https://reactrouter.com/en/main/hooks/use-navigate
    const navigate = useNavigate();

    // We utilize 'useEffect' below.  For more: https://react.dev/learn/synchronizing-with-effects#step-1-declare-an-effect
    useEffect(() => {
        fetchTodos();
    }, []);


    // function to get/fetch all items in todo
    const fetchTodos = async () => {
        const response = await axios.get(`${API_URL}/todos/`);
        setAllTodos(response.data); //sets 'todos' with value from get request.
    };


    const deleteTodo = async (id: number) => {
        console.log("deleteTodo");
        await axios.delete(`${API_URL}/todos/${id}`);
        fetchTodos(); //update list after deletion
    };


    return (
        <>
            <div className="m-3">
                <button className="btn btn-info mb-3" onClick={() => navigate("/new")}>New Todo</button>
                <div style={{ overflowY: 'auto' }}>
                    <ul className="list-group">
                        {allTodos.map(todo => (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: todo.completed ? 'lightgreen' : 'cyan', marginBottom: '5px' }}>
                                <Link to={`/todo/${todo.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                        {todo.title}
                                        {/* {todo.title} |  {todo.completed ? "Task Completed" : "Task not Completed"} */}
                                    </div>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TodoList;

