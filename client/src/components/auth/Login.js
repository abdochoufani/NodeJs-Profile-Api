import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const currentUser = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(currentUser)
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { errors } = this.state

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form noValidate onSubmit={this.handleSubmit}>

                                <TextFieldGroup
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    errors={errors.email}
                                    onChange={this.handleChange}
                                />

                                <TextFieldGroup
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    errors={errors.password}
                                    onChange={this.handleChange}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login))