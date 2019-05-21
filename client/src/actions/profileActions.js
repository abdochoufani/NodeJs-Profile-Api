import axios from 'axios'
import { GET_ERRORS, GET_CURRENT_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";





//create user profile
export const createUserProfile = (profileData, history) => dispatch => {
    axios.post('/profile', profileData)
        .then(res => {

        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//get user profile

export const getUserProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/profile')
        .then(res => {
            dispatch({
                type: GET_CURRENT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_CURRENT_PROFILE,
            payload: {}
        }))
}

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// clear profile 
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}