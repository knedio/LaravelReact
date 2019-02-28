import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Profile from './../user/Profile';

class Navbar extends Component {

    logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('userToken');
        localStorage.removeItem('userID');
        localStorage.removeItem('userType');
        this.props.history.push('/');
    }

    render() {
        const loggedInLink = localStorage.user ? (
            <React.Fragment>
                <li className="nav-item">
                    <Route name="/profile/:id" handler ={Profile} />
                    <Link to={`/profile/${ localStorage.userID }`} className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <a href="#" onClick={this.logOut} className="nav-link">Logout</a>
                </li>
            </React.Fragment>
        ) : '';

        const notLoggedInLink = (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/registration">Registration</Link>
                </li>
            </React.Fragment>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Laravel React</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                                    {/*<span className="sr-only">(current)</span>*/}
                            </li>
                            {localStorage.userToken ? loggedInLink : notLoggedInLink}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);