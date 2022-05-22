/* Importing the validator module. */
const validator = require('validator');

const verifyParams = (token, sender, message, receiver) => {
    const errors = {};
    if (validator.isEmpty(token)) {
        errors.token = 'A valid Trenalyze Token is required';
    } else if (!(validator.isLength(token, { min: 20, max: 20 }))) {
        errors.token = 'Please use a valid Trenalyze Token';
    }

    if (validator.isEmpty(sender)) {
        errors['sender'] = 'Sender is required.';
    } else if (!(validator.isMobilePhone(sender))) {
        errors['sender'] = 'Sender must be a valid WhatsApp Phone Number.';
    }

    if (validator.isEmpty(receiver)) {
        errors['receiver'] = 'Receiver is required.';
    } else if (!(validator.isMobilePhone(receiver))) {
        errors['receiver'] = 'Receiver must be a valid Phone Number.';
    }

    if (validator.isEmpty(message)) {
        errors['message'] = 'Message is required.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = {
    verifyParams
}