import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from './HomeButton';

interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhostx:8008';

function TodoDetail() {
    // We utilize 'useState' below. For more: https://react.dev/learn#updating-the-screen)
    const [todo, setTodo] = useState<TodoItem | null>(null);

    // For more: https://reactrouter.com/en/main/hooks/use-params
    const { todo_id } = useParams();

    //For more: https://reactrouter.com/en/main/hooks/use-navigate
    const navigate = useNavigate();

    // We need to use callback if we want to useEffect anytime the fetchTodo is run. But the fetch todo is dependent on the param "todo_id", so we use call back.
    // For more: https://react.dev/reference/react/useCallback
    const fetchTodo = useCallback(async () => {
        const response = await axios.get(`${API_URL}/todos/${todo_id}/`);
        setTodo(response.data);
    }, [todo_id]);  // Dependencies that might cause fetchTodo to change

    //// If you use code below, the useEffect will demand dependency from fetchTodo because fetchTodo is dependent on "todo_id"
    // const fetchTodo = async () => {
    //     const response = await axios.get(`http://localhost:8008/todos/${todo_id}/`);
    //     setTodo(response.data);
    // };


    // We utilize 'useEffect' below.  For more: https://react.dev/learn/synchronizing-with-effects#step-1-declare-an-effect
    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]); 



    const updateTodo = async () => {
        if (todo) {
            await axios.put(`${API_URL}/todos/${todo.id}`, todo);
            setTodo({ ...todo });
            navigate('/', { replace: true });
        }
    };

    const deleteTodo = async () => {
        if (todo) {
            await axios.delete(`${API_URL}/todos/${todo.id}`);
            navigate('/');
        }
    };

    return (
        <div className="container">
            {
                todo ? (
                    <>
                        <HomeButton ></HomeButton>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="todoTitle" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    id="todoTitle"
                                    value={todo.title}
                                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="todoDescription" className="form-label">Description</label>
                                <textarea
                                    className="form-control mb-3"
                                    id="todoDescription"
                                    placeholder="Enter task description"
                                    value={todo.description}
                                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                                />
                            </div>
                            <div className="form-check mb-3">
                                <label className="form-check-label" htmlFor="todoComplete">Completed</label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="todoComplete"
                                    checked={todo.completed}
                                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                                />
                            </div>
                            <button type="button" className="btn btn-primary mt-3" onClick={updateTodo}>Update Todo</button>
                            <button type="button" className="btn btn-danger mt-3" onClick={deleteTodo}>Delete Todo</button>
                        </form>

                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
};

export default TodoDetail;
