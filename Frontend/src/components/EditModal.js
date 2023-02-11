import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class EditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          show: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.show
        })
      }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.props.closeEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={this.props.currentTodo.task || ""} onChange={this.props.handleChangeTask}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.closeEdit()}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => { this.props.toggleComplete(this.props.currentTodo); this.props.closeEdit() } }>
                        Mark Complete
                    </Button>
                    <Button variant="primary" onClick={this.props.saveTodo}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditModal;
