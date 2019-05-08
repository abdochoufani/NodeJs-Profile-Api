const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    let errors = {}
    data.school = !isEmpty(data.school) ? data.school : ''
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''
    data.degree = !isEmpty(data.degree) ? data.degree : ''
    data.from = !isEmpty(data.from) ? data.from : ''




    if (validator.isEmpty(data.school)) {
        errors.school = " School field is required"
    }

    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Field of study field is required"
    }

    if (validator.isEmpty(data.degree)) {
        errors.degree = "Field of study field is required"
    }

    if (validator.isEmpty(data.from)) {
        errors.from = "from date field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}