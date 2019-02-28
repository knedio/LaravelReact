import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getProfile } from '../../providers/UserApi';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import UserUpdateModal from '../modals/UserUpdateModal';
import CustomMap from './../maps/CustomMap';
import { updateUser } from './../../providers/UserApi';

export default class Profile extends Component {
    
    state = {
        user: {
            id: '', 
            name: '', 
            email: '', 
            address: '', 
            gender: '', 
            description: '',
            access_type: '',
            password: ''
        },
        show: false
    }
    
    componentDidUpdate(prevProps){
        if (prevProps.match.params.id !== this.props.match.params.id) {
            getProfile(this.props.match.params.id).then( res => {
                this.setState( prevState => ({
                    user: {
                        id: res.id, 
                        name: res.name, 
                        email: res.email, 
                        address: res.address, 
                        gender: res.gender, 
                        description: res.description,
                        access_type: res.access_type,
                        password: ''
                    },
                    show: false
                }));
            });
        }
    }

    componentDidMount(){

        // If no token back to root page
        !localStorage.userToken && this.props.history.push('/');

        getProfile(this.props.match.params.id).then( res => {
            this.setState( prevState => ({
                user: {
                    id: res.id, 
                    name: res.name, 
                    email: res.email, 
                    address: res.address, 
                    gender: res.gender, 
                    description: res.description,
                    access_type: res.access_type,
                    password: ''
                },
                show: false
            }));
        });
    }

    handleClose = () => {
        this.setState({
            show: false,
        });
    }

    handleShow = () => {
        this.setState({
            show: true,
        });
    }

    updateUser = (user) => {
        updateUser(user).then( res => {
            if (res) {
                this.setState({
                    user: {...user}
                })
            }
        })
    }

    render() {
        const { id, name, email, address, description, gender, access_type } = this.state.user;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="mt-5">
                        {localStorage.userID != id ? name+"'s Info" : "Your Info" }
                        </h1>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-5">
                    <div className="col-lg-12 col-md-12 col-xs-12">
                        <div>
                            <div className="">
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Name:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{name}</h3>
                                    </div>

                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Email:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{email}</h3>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Gender:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{gender}</h3>
                                    </div>

                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Description:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{description}</h3>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Address:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{address}</h3>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputEmail3" className="col-sm-6 col-md-2 col-form-label">Access Type:</label>
                                    <div className="col-sm-6 col-md-4">
                                        <h3>{access_type}</h3>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-6 col-md-2">
                                    </div>
                                    <div className="col-sm-6 col-md-4">
                                    <CustomMap />
                                    </div>
                                </div>

                                <hr/>
                                <div className="form-group row float-right">
                                    <Link className="btn btn-secondary mr-2" to='/'>Back</Link>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary mr-2" 
                                        onClick={this.handleShow}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <UserUpdateModal 
                    updateUser={this.updateUser} 
                    show={this.state.show} 
                    handleShow={this.handleShow} 
                    handleClose={this.handleClose} 
                    user={this.state.user} 
                />
            </div>
        );
    }
}