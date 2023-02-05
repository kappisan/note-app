import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import TaskModal from './components/TaskModal/TaskModal.tsx';


import './App.css';

const TodoApp = () => {

  const today = new Date().toDateString();
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState({});
  
  const showEdit = (todo) => {
    console.log("handle show", todo);
    setTodo(todo);
    setShow(true);
  }
  

  const closeEdit = () => setShow(false);

  // will be empty
  const [todos, setTodos] = useState([
    { id: 1, added: today, done: true, task: 'Do laundry', completed: false },
    { id: 2, added: today, done: false, task: 'Buy groceries', completed: false },
  ]);

  const addTodo = (task) => {
    setTodos([...todos, { id: todos.length + 1, task, completed: false, added: new Date().toDateString() }]);
  };

  const editTodo = (id, task) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task } : todo
      )
    );
  };

  return (
    <div className="gradient">
      <div className="container">

        <Modal show={show} onHide={closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{todo.task}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { /*editTodo(todo.id, prompt('Edit Todo:', todo.task));*/ }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        <h1>To-Do List</h1>
        <table>
          <thead>
            <tr>
              <th>Done</th>
              <th>Added</th>
              <th>Task</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td><input type='checkbox' value={todo.done} /></td>
                <td>{todo.added}</td>
                <td>{todo.task}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={ () => showEdit(todo) }>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={() => addTodo(prompt('Add Todo:'))}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoApp;