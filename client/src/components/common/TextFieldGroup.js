import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    errors,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input onChange={onChange} type={type} className={classNames("form-control form-control-lg", {
                'is-invalid': errors
            })}
                placeholder={placeholder}
                value={value}
                name={name}
                disabled={disabled} />
            {info && (
                <small className="form-text text-muted">{info}</small>
            )}
            {errors && (
                <div className="invalid-feedback">
                    {errors}
                </div>
            )}
        </div >
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup