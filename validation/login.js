const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''




    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide a valid Email. "
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Please provide an Email."
    }


    if (!validator.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be between 7 and 30 characters"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field can not be empty."
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}