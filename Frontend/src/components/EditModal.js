import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditModal(props) {

    return (
        <Modal show={props.show} onHide={props.closeEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" value={props.currentTodo.task || ""} onChange={props.handleChangeTask}></input>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.closeEdit()}>
                    Close
                </Button>
                <Button variant="success" onClick={() => { props.toggleComplete(props.currentTodo); props.closeEdit() } }>
                    Mark Complete
                </Button>
                <Button variant="primary" onClick={props.saveTodo}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;
