import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearProfile } from './actions/profileActions'


if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    //decode token 
    const decoded = jwt_decode(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))
    //check for expired tokens
    const setCurrentTime = Date.now() / 1000
    if (decoded.exp < setCurrentTime) {
        // logout user
        store.dispatch(logoutUser())
        //clear current profile
        store.dispatch(clearProfile())
        // redirect to login
        window.location.href = '/login'
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
