import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { login } from '../../providers/UserApi';

const errMessage = {
    fontWeight: 'bold',
    color: '#ff0000'
};

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {},
    };

    onChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        });
    };
    
    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then( res => {
            if (res.status === 200) {
                this.props.history.push(`/profile/${ localStorage.userID }`);
            }else{
                this.setState({
                    errors: res
                });
            }
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Login Form</h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-5">
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        {this.state.errors.error && 
                           
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                              <strong>Invalid Credentials!</strong> Please try again.
                              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                        }
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="Email"><strong>Email Address :</strong></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password"><strong>Password :</strong></label>
                                <input 
                                    type="password" 
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={this.state.passowrd}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}