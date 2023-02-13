import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditModal(props) {

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea type="text" value={props.currentTodo.task || ""} onChange={props.handleChangeTask}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.close()}>
                    Close
                </Button>
                <Button variant="success" onClick={() => { props.toggleComplete(props.currentTodo); props.close() } }>
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
