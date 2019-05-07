const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''


    if (validator.isEmpty(data.name)) {
        errors.name = "Name field can not be empty."
    }

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Name must be between 2 and 30 characters."
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide a valid Email. "
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Please provide an Email."
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field can not be empty."
    }

    if (!validator.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be between 7 and 30 characters"
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field must not be empty."
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords do not match. Please try again"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}