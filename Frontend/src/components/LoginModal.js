import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    updateUsername = (e) => {
        this.setState({ username: e.target.value });
    }
    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    login = () => {
        console.log("login", this.state.username, this.state.password);
        fetch("http://localhost:3001/api/login", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(({ results }) => {
            console.log("login results", results);
            // save credentials to user locally
        })
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Username</label>
                    <input 
                        type="text"
                        value={this.state.username}
                        onChange={this.updateUsername} />

                    <label>Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.updatePassword} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginModal;
