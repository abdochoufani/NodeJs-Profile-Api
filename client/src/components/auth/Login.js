import React, { Component } from 'react'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const currentUser = {
            email: this.stat.email,
            password: this.state.password
        }
        console.log(currentUser)
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input onChange={(e) => this.handleChange(e)} type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <input onChange={(e) => this.handleChange(e)} type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} />
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
