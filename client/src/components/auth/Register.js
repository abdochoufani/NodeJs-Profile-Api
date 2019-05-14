import React, { Component } from 'react'

export default class Register extends Component {



    handleSubmit = (event) => {
        event.preventDefault()

    }

    handleChange = () => {

    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input onChange={() => this.handleChange} type="text" className="form-control form-control-lg" placeholder="Name" name="name" required />
                                </div>
                                <div className="form-group">
                                    <input onChange={() => this.handleChange} type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input onChange={() => this.handleChange} type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
                                </div>
                                <div className="form-group">
                                    <input onChange={() => this.handleChange} type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" />
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
