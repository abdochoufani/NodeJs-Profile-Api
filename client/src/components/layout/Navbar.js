import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/authActions'
import { clearProfile } from '../../actions/profileActions'


class Navbar extends Component {

    onLogoutClick = (e) => {
        e.preventDefault()
        this.props.clearProfile()
        this.props.logoutUser()
    }
    render() {
        const { isAuthenticated, user } = this.props.auth


        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/register" className="nav-link" href="register.html">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" href="login.html">Login</Link>
                </li>
            </ul>
        )

        const authLinks = (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <a className="nav-link" href="" onClick={this.onLogoutClick}>
                        <img src={user.avatar} alt={user.name} style={{ width: '25px', marginRight: '5px' }} title="You must have a gravatar image for it to display" />Logout</a>
                </li>
            </ul>
        )
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
                        {isAuthenticated ? authLinks : guestLinks}

                    </div>
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired

}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar)