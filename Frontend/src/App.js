import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './App.css';

const TodoApp = () => {

  const newTodo = {
    added: '',
    task: '',
    completed: false,
    added: ''
  }

  const today = new Date().toDateString();
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState(newTodo);

  
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

  const saveTodo = () => {
    if (!todo.id) {
      setTodos([
        ...todos,
        {
          ...todo,
          added: new Date().toDateString(),
          id: todos.length + 1
        }
      ]);
    } else {
      setTodos(
        todos.map((td) =>
          todo.id === td.id ? todo : td
        )
      );
    }
    closeEdit();
  };

  const handleChangeTask = (event) => {
    console.log(event.target.value, todo);
    setTodo({
      ...todo,
      task: event.target.value
    });
  }

  return (
    <div className="gradient">
      <div className="container">

        <Modal show={show} onHide={closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type="text" value={todo.task || ""} onChange={handleChangeTask}></input></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={saveTodo}>
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
                <td><input type='checkbox' /></td>
                <td>{todo.added}</td>
                <td>{todo.task}</td>
                <td>
                  <img src={require("./img/edit-icon.png")} className="edit-icon" onClick={ () => showEdit(todo) } />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={showEdit}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoApp;