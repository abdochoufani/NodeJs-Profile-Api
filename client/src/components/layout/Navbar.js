import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand" href="landing.html">DevConnector</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" href="profiles.html"> Developers </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" href="register.html">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" href="login.html">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

