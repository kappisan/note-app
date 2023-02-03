import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Do laundry', completed: false },
    { id: 2, task: 'Buy groceries', completed: false },
  ]);

  const addTodo = (task) => {
    setTodos([...todos, { id: todos.length + 1, task, completed: false }]);
  };

  const editTodo = (id, task) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task } : todo
      )
    );
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}{' '}
            <button onClick={() => editTodo(todo.id, prompt('Edit Todo:', todo.task))}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo(prompt('Add Todo:'))}>Add Todo</button>
    </div>
  );
};

export default TodoApp;