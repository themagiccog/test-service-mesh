import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import TodoNew from './components/TodoNew';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/todo/:todo_id" element={<TodoDetail />} />
          <Route path="/new" element={<TodoNew />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

