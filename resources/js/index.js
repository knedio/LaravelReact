import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Custom Components
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import Profile from './components/user/Profile';

export default class Index extends Component {
    state = {
        test: []
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/profile/:id" component={Profile} />
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
