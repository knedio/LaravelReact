import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { register } from '../../providers/UserApi';

const errMessage = {
    fontWeight: 'bold',
    color: '#ff0000'
};

export default class Registration extends Component {

    state = {
        name: '',
        email: '',
        address: '',
        gender: '',
        description: '',
        access_type: '',
        password: '',
        errors: [],
    };

    onChange = (e) => {
        const { name, value, type, checked } = e.target
        this.setState({ [name]: value });
        // type === 'checkbox' ?  this.setState({  [name]: checked }) : this.setState({ [name]: value });
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.gender,
            description: this.state.description,
            access_type: this.state.access_type,
            password: this.state.password
        }
        console.log(user)
        register(user).then( res => {
            if (res.status === 200) {
                this.props.history.push('/login');
            }else{
                this.setState({
                    errors: res
                });
            }
        })
        .catch( err => {
            console.log(err);
        });
    };

    render() {
        console.log(this.state.errors.name)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Registration Form</h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-5">
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <form onSubmit={this.onSubmit}>
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
                                {this.state.errors.name && 
                                    <div style={errMessage}>
                                        {this.state.errors.name}
                                    </div>
                                }
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
                                {this.state.errors.email && 
                                    <div style={errMessage}>
                                        {this.state.errors.email}
                                    </div>
                                }
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
                                {this.state.errors.address && 
                                    <div style={errMessage}>
                                        {this.state.errors.address}
                                    </div>
                                }
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
                                {this.state.errors.gender && 
                                    <div style={errMessage}>
                                        {this.state.errors.gender}
                                    </div>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><strong>Description :</strong></label>
                                <textarea 
                                    className="form-control" 
                                    name="description"
                                    placeholder="Enter Description" 
                                    value={this.state.description} 
                                    onChange={this.onChange} 
                                />
                                {this.state.errors.description && 
                                    <div style={errMessage}>
                                        {this.state.errors.description}
                                    </div>
                                }
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
                                {this.state.errors.access_type && 
                                    <div style={errMessage}>
                                        {this.state.errors.access_type}
                                    </div>
                                }
                            </div>
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
                                {this.state.errors.password && 
                                    <div style={errMessage}>
                                        {this.state.errors.password}
                                    </div>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}