import axios from 'axios'

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//Register User

export const registerUser = (userData, history) => dispatch => {
    axios.post('api/users/register', userData)
        .then(res => {
            history.push('/login')
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//login User -GetToken
export const loginUser = (userData) => dispatch => {
    axios.post('api/users/login', userData)
        .then(res => {
            //get token
            const { token } = res.data
            //setItem to LocalStorage
            localStorage.setItem('jwtToken', token)
            //set Token to auth header
            setAuthToken(token)
            //decode token
            const decoded = jwt_decode(token)
            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


//log user out 
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    //set the current user { } isAuthenticated: false
    dispatch(setCurrentUser({}))

}