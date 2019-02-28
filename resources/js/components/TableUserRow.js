import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Profile from './../components/user/Profile';

export default class TableUserRow extends Component {
    state = {
        id: '', 
        name: '', 
        email: '', 
        address: '', 
        gender: '', 
        description: '',
        access_type: '',
        password: ''
    }
    
    componentDidUpdate(prevProps,prevState){
        if (prevProps.user !== this.props.user) {
            this.setState({
                id: this.props.user.id, 
                name: this.props.user.name, 
                email: this.props.user.email, 
                address: this.props.user.address, 
                gender: this.props.user.gender, 
                description: this.props.user.description,
                access_type: this.props.user.access_type,
            })
        }
    }
    
    componentDidMount(){
        this.setState({
            id: this.props.user.id,
            name: this.props.user.name, 
            email: this.props.user.email, 
            address: this.props.user.address, 
            gender: this.props.user.gender, 
            description: this.props.user.description,
            access_type: this.props.user.access_type,
        });
        // console.log(this.state.id)
    }
    
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            id: Math.floor(this.state.id),
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.gender,
            description: this.state.description,
            access_type: this.state.access_type,
            password: this.state.password
        }
        this.props.removeQuickEdit(this.state.id)
        // console.log(this.state)
        // console.log('this,this.state.id')
        this.props.updateUser(user);
    }

    render() {
        const { id, name, email, address, gender, description, access_type } = this.props.user;

        const actionBtn = (
            <React.Fragment>
                <Route name="/profile/:id" handler ={Profile} />
                <Link to={`/profile/${ id }`} className="btn btn-success btn-sm mr-2">View</Link>
                <button 
                    type="button" 
                    className="btn btn-primary btn-sm mr-2"
                    onClick={this.props.handleShow.bind(this,id)}>
                    Edit
                </button>
                <button 
                    type="button" 
                    className="btn btn-secondary btn-sm mr-2"
                    disabled={this.props.quickEditBtn}
                    onClick={this.props.addQuickEdit.bind(this,this.state)}>
                    Quick Edit
                </button>
            </React.Fragment>
        );
        const viewRow = (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{gender}</td>
                <td>{description}</td>
                <td>
                    {
                        localStorage.userToken && actionBtn
                    }
                    {    
                        localStorage.userType === 'Admin' ? 
                        <button 
                            type="button" 
                            className="btn btn-danger btn-sm mr-2"
                            onClick={this.props.deleteUser.bind(this,this.state.id)}>
                            Delete
                        </button>
                        : ''
                    }
                </td>
            </tr>
        );
        const editRow = (
            <tr>
                <td colSpan="7">
                    <form onSubmit={this.onSubmit}>
                        <div className="">
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-2 col-form-label">Name:</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="text" 
                                        name="name"
                                        className="form-control" 
                                        id="" 
                                        value={this.state.name} 
                                        placeholder="Enter email"
                                        onChange={this.onChange}
                                    />
                                </div>

                                <label htmlFor="" className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="email" 
                                        name="email"
                                        className="form-control" 
                                        id="" 
                                        value={this.state.email} 
                                        placeholder="Enter email"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-2 col-form-label">Gender:</label>
                                <div className="col-sm-4">
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

                                <label htmlFor="" className="col-sm-2 col-form-label">Description:</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="text" 
                                        name="description"
                                        className="form-control" 
                                        id="" 
                                        value={this.state.description} 
                                        placeholder="Enter email"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="col-sm-2 col-form-label">Address:</label>
                                <div className="col-sm-4">
                                    <input 
                                        type="text" 
                                        name="address"
                                        className="form-control" 
                                        id="" 
                                        value={this.state.address} 
                                        placeholder="Enter email"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <label htmlFor="" className="col-sm-2 col-form-label">Access Type:</label>
                                <div className="col-sm-4">
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
                            </div>
                            <hr/>
                            <div className="form-group row float-right">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary mr-2"
                                    onClick={this.props.removeQuickEdit.bind(this,this.props.user.id)}>
                                    Close
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mr-2" >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
        return (
            <React.Fragment>
                {this.props.user.id % 1 === 0 ? viewRow : editRow}
            </React.Fragment>
        );
    }
}