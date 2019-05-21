import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getUserProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getUserProfile()
    }
    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            //check if user created a profile
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h4>Display Profile</h4>
            } else {
                //user has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet set up a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



Dashboard.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getUserProfile })(Dashboard)