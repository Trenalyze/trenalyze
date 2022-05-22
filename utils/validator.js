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

    /* Checking if the hostname is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(hostname)) {
        errors['hostname'] = 'Please hostname is required. Please do not edit it.';
    }

    /* Checking if the hostname is a valid URL. */
    else if (!(validator.isURL(hostname))) {
        errors['hostname'] = 'Please hostname must be a url.';
    }

    /* Checking if the hostname is equal to api.trenalyze.com. If it is not, it will add an error to
       the errors object. */
    else if (!(validator.equals(hostname, 'api.trenalyze.com'))) {
        errors['hostname'] = 'Please hostname cannot be changed.';
    }

    /* Checking if the appurl is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(appurl)) {
        errors['appurl'] = 'Please appurl is required. Please do not edit it.';
    }

    /* Checking if the appurl is a valid URL. */
    else if (!(validator.isURL(appurl))) {
        errors['appurl'] = 'Please appurl must be a url.';
    }

    /* Checking if the appurl is equal to https://trenalyze.com. If it is not, it will add an error
       to the errors object. */
    else if (!(validator.equals(appurl, 'https://trenalyze.com'))) {
        errors['appurl'] = 'Please appurl cannot be changed.';
    }

    /* Checking if the token is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(token)) {
        errors['token'] = 'A valid Trenalyze Token is required';
    }

    /* Checking if the token is 20 characters long. */
    else if (!(validator.isLength(token, { min: 20, max: 20 }))) {
        errors['token'] = 'Please use a valid Trenalyze Token ';
    }

    /* Checking if the sender is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(sender)) {
        errors['sender'] = 'Sender is required.';
    }

    /* Checking if the sender is a valid WhatsApp phone number. */
    else if (!(validator.isMobilePhone(sender))) {
        errors['sender'] = 'Sender must be a valid WhatsApp Phone Number.';
    }

    /* Checking if the receiver is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(receiver)) {
        errors['receiver'] = 'Receiver is required.';
    }

    /* Checking if the receiver is a valid phone number. */
    else if (!(validator.isMobilePhone(receiver))) {
        errors['receiver'] = 'Receiver must be a valid Phone Number.';
    }

    /* Checking if the message is empty. If it is empty, it will add an error to the errors object. */
    if (validator.isEmpty(message)) {
        errors['message'] = 'Message is required.';
    }

    /* Returning an object with two properties: errors and valid. */
    return {

        /* A comma operator. It is used to evaluate multiple expressions and returns the value of the
        last expression. */
        errors,

        /* Checking if the errors object is empty. If it is empty, it will return true. If it is not
        empty, it will return false. */
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


/* Exporting the functions verifyParams and verifyMediaUrl. */
module.exports = {

    /* Checking if the parameters are valid. */
    verifyParams,

    /* Checking if the mediaurl is a valid URL. */
    verifyMediaUrl
}