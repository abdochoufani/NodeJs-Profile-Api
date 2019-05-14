import React, { Component } from 'react'

export default class Login extends Component {



    handleSubmit = (event) => {
        event.preventDefault()

    }

    handleChange = () => {

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
                                    <input onChange={() => this.handleChange()} type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
                                </div>
                                <div className="form-group">
                                    <input onChange={() => this.handleChange()} type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
                                </div>
                                <input onChange={() => this.handleChange()} type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
