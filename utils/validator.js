/* Importing the validator module. */
const validator = require('validator');

/**
 * It checks if the parameters are valid
 * @param hostname - This is the hostname of the API. Please do not change it.
 * @param appurl - This is the url of the app. Please do not edit it.
 * @param token - Your Trenalyze Token
 * @param sender - The WhatsApp number you want to send the message from.
 * @param message - The message you want to send.
 * @param receiver - The phone number of the person you want to send the message to.
 * @returns An object with two properties: errors and valid.
 */
const verifyParams = (hostname, appurl, token, sender, message, receiver) => {
    /* Creating an empty object. */
    const errors = {};
    if (validator.isEmpty(hostname)) {
        errors['hostname'] = 'Please hostname is required. Please do not edit it.';
    } else if (!(validator.isURL(hostname))) {
        errors['hostname'] = 'Please hostname must be a url.';
    } else if (!(validator.equals(hostname, 'api.trenalyze.com'))) {
        errors['hostname'] = 'Please hostname cannot be changed.';
    }

    if (validator.isEmpty(appurl)) {
        errors['appurl'] = 'Please appurl is required. Please do not edit it.';
    } else if (!(validator.isURL(appurl))) {
        errors['appurl'] = 'Please appurl must be a url.';
    } else if (!(validator.equals(appurl, 'https://trenalyze.com'))) {
        errors['appurl'] = 'Please appurl cannot be changed.';
    }

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

const verifyMediaUrl = (mediaurl) => {
    const errors = {};
    if (!(validator.isURL(mediaurl))) {
        errors['mediaurl'] = 'Please use a valid URL.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = {
    verifyParams,
    verifyMediaUrl
}