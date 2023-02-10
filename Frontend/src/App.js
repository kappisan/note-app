import React, { useState } from 'react';
import uuid from 'react-uuid';

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
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(newTodo);

  const showEdit = (todo) => {
    setCurrentTodo(todo);
    setShow(true);
  }
  
  const addTodo = () => {
    setCurrentTodo({
      ...newTodo,
      id: uuid()
    });
    setShow(true);
  }

  const closeEdit = () => setShow(false);

  const startList = [
    { id: uuid(), added: today, task: 'Do laundry', completed: true },
    { id: uuid(), added: today, task: 'Buy groceries', completed: false }
  ];

  // will be empty
  const [todos, setTodos] = useState(JSON.parse(window.localStorage.getItem('todos')) || startList);

  const saveTodo = () => {
    let tds = [];
    if (todos.find(t => t.id === currentTodo.id)) {
      tds = todos.map((td) => currentTodo.id === td.id ? currentTodo : td );
    } else {
      tds = [
        ...todos,
        {
          ...currentTodo,
          added: new Date().toDateString(),
          id: uuid()
        }
      ];
    }
    setTodos(tds);
    window.localStorage.setItem('todos', JSON.stringify(tds));
    closeEdit();
  };

  const deleteTodo = (todo) => {
    const tds = todos.filter(t => t.id != todo.id)
  
    setTodos(tds);
    window.localStorage.setItem('todos', JSON.stringify(tds));
  }

  const handleChangeTask = (event) => {
    setCurrentTodo({
      ...currentTodo,
      task: event.target.value
    });
  }

  const toggleComplete = (todo) => {
    todo.completed = !todo.completed;
    const tds = todos.map((td) => todo.id === td.id ? todo : td)
    setTodos(tds);
    window.localStorage.setItem('todos', JSON.stringify(tds));
  }

  return (
    <div className="gradient">

      <div className="cloud x1"></div>
      <div className="cloud x2"></div>
      <div className="cloud x3"></div>
      <div className="cloud x4"></div>
      <div className="cloud x5"></div>

      <div className="container">

        <Modal show={show} onHide={closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type="text" value={currentTodo.task || ""} onChange={handleChangeTask}></input></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={saveTodo}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 className="title">To-Do List</h1>
        <table>
          <thead>
            <tr>
              <th className="text-center">Done</th>
              <th>Added</th>
              <th>Task</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="text-center">
                  <img
                    src={require("./img/accept.png")}
                    className="edit-icon"
                    className={todo.completed ? 'edit-icon' : 'edit-icon desaturate'}
                    onClick={() => toggleComplete(todo) } />
                </td>
                <td>{todo.added}</td>
                <td>{todo.task}</td>
                <td>
                  { !todo.completed && <img src={require("./img/edit-icon.png")} className="edit-icon" onClick={ () => showEdit(todo) } /> }
                </td>
                <td>
                  <img src={require("./img/trash.png")} className="edit-icon" onClick={ () => deleteTodo(todo) } />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="add-new" onClick={addTodo}>New Todo</button>
      </div>
    </div>
  );
};

export default TodoApp;