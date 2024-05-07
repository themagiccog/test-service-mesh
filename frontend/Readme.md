To create a Todo list Single Page Application (SPA) using Create React App with TypeScript and Bootstrap, follow the steps below. This setup will include state management only if necessary, but considering the app's structure, we'll use the built-in React state management with hooks like `useState` and `useEffect` for simplicity.

### 1. Setup Create React App with TypeScript

First, you need to set up the project. If you don't have Create React App installed, you can do so and create the project with the following commands:

```bash
npx create-react-app todo-list --template typescript
cd todo-list
```

### 2. Install Dependencies (Bootstrap, axios, react-router-dom@6)

You can add Bootstrap to your project by installing it via npm:

```bash
npm install bootstrap
```

Install React Router for navigation:

```bash
npm install react-router-dom@6 @types/react-router-dom  
```

Install Axios for API calls:

```bash
npm install axios
```

Then, import Bootstrap in `src/index.tsx` (optionally, import in `src/App.tsx` and not in `index.tsx`):

```typescript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 3. Create Components

First, create a folder called `components`.

```bash
mkdir components
```

Then create component files.

#### `components/TodoList.tsx`

This component will display the list of Todo items and provide options to add a new item or delete an existing one.

```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface TodoItem {
    id: number;
    title: string;
}

const TodoList = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:8008/todos/');
        setTodos(response.data);
    };

    const addTodo = async () => {
        if (newTodo) {
            await axios.post('http://localhost:8008/todos/', { title: newTodo });
            setNewTodo('');
            fetchTodos();
        }
    };

    const deleteTodo = async (id: number) => {
        await axios.delete(`http://localhost:8008/todos/${id}`);
        fetchTodos();
    };

    return (
        <div className="container">
            <input
                type="text"
                className="form-control mb-3"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button className="btn btn-primary mb-3" onClick={addTodo}>Add Todo</button>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
                        <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
```

#### `components/TodoDetail.tsx`

This component handles the Todo item detail view where items can be modified or deleted.

```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TodoItem {
    id: number;
    title: string;
}

const TodoDetail = () => {
    const [todo, setTodo] = useState<TodoItem | null>(null);
    const { todo_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        const response = await axios.get(`http://localhost:8008/todos/${todo_id}`);
        setTodo(response.data);
    };

    const updateTodo = async () => {
        if (todo) {
            await axios.put(`http://localhost:8008/todos/${todo.id}`, todo);
            navigate('/');
        }
    };

    const deleteTodo = async () => {
        if (todo) {
            await axios.delete(`http://localhost:8008/todos/${todo.id}`);
            navigate('/');
        }
    };

    return (
        <div className="container">
            {todo ? (
                <>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={todo.title}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                    />
                    <button className="btn btn-success mb-3" onClick={updateTodo}>Update Todo</button>
                    <button className="btn btn-danger" onClick={deleteTodo}>Delete Todo</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TodoDetail;
```

### 4. Set Up Routing

Makesure router don is installed. (see above)

Modify

 `src/App.tsx` to use the routing:

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todo/:todo_id" element={<TodoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

### 5. Start Your Application

Run your application to see the Todo list SPA in action:

```bash
npm start
```

This basic setup provides a working React application for managing Todo items, with TypeScript for type safety and Bootstrap for styling. Adjustments and additional features can be implemented based on further requirements or personal preferences.

## Deployment
REACT_APP_API_URL=http://localhost:8008 npm run build
npm install -g serve
serve -s build