import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button } from 'react-bootstrap';

export default class UserUpdateModal extends Component {
    state = {
        id: '', 
        name: '', 
        email: '', 
        address: '', 
        gender: '', 
        description: '',
        access_type: '',
        change_password: false,
        password: ''
    }

    componentDidUpdate(prevProps){
        if (prevProps.show !== this.props.show) {
            this.setState({
                id: this.props.user.id, 
                name: this.props.user.name, 
                email: this.props.user.email, 
                address: this.props.user.address, 
                gender: this.props.user.gender, 
                description: this.props.user.description,
                access_type: this.props.user.access_type,
                password: this.props.user.password
            })
        }
    }
    
    onChange = (e) => {
        const { name, value, type, checked } = e.target;
        type === 'checkbox' ? this.setState({  [name]: checked }) : this.setState({  [name]: value })

        // this.setState( prevState => {
        //    let data = {}
        //     for (const key of Object.keys(prevState.user)) {
        //         if (key === name) {
        //             prevState.user[key] = value
        //         }
        //         data[key] = prevState.user[key]
        //     }
        //     return {
        //         modal: {
        //             show: true,
        //             data: data
        //         }
        //     }
        // });
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.gender,
            description: this.state.description,
            access_type: this.state.access_type,
            password: this.state.password
        }
        this.props.updateUser(user);
        this.props.handleClose();

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor=""><strong>Name :</strong></label>
                            <input 
                                type="text"
                                name="name"
                                className="form-control" 
                                placeholder="Enter Name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><strong>Email Address :</strong></label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-control" 
                                placeholder="Enter Email Address" 
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><strong>Address :</strong></label>
                            <input 
                                type="text" 
                                name="address"
                                className="form-control" 
                                placeholder="Enter Address" 
                                value={this.state.address}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><strong>Description :</strong></label>
                            <input 
                                type="text" 
                                name="description"
                                className="form-control" 
                                placeholder="Enter Description" 
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><strong>Gender :</strong></label>
                            <div className="form-check">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    className="form-check-input" 
                                    value="Male" 
                                    checked={this.state.gender === 'Male'}
                                    onChange={this.onChange}
                                />
                                <label className="form-check-label" htmlFor="">Male</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    className="form-check-input" 
                                    value="Female" 
                                    checked={this.state.gender === 'Female'}
                                    onChange={this.onChange}
                                />
                                <label className="form-check-label" htmlFor="">Female</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor=""><strong>Access Type :</strong></label>
                            <select 
                                className="form-control" 
                                name="access_type" 
                                value={this.state.access_type} 
                                onChange={this.onChange}
                                defaultValue=""
                            >
                                <option value="" disabled>-- Select Access Type --</option>
                                <option value="Registered">Registered</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="form-check">
                            <input 
                                type="checkbox" 
                                name="change_password" 
                                className="form-check-input"
                                onChange={this.onChange}
                            />
                            <label className="form-check-label" htmlFor="">Check to change password</label>
                        </div>
                        {
                            this.state.change_password &&
                            <div className="form-group">
                                <label htmlFor=""><strong>Password :</strong></label>
                                <input 
                                    type="password" 
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password" 
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}