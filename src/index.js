/* It's a Node.js module that allows you to make HTTPS requests. */
const https = require('https');

const { verifyParams, verifyMediaUrl } = require('../utils/validator');

/* It's a class that sends messages to a user on Trenalyze.com. */
class Trenalyze {
    /**
     * The constructor function is a special function that is called when an object is created from a
     * class.
     * @param token - The token you received from Trenalyze.
     * @param sender - The whatsapp phone number of the sender with country code.
     * @param debug - true/false
     */
    constructor(token, sender, debug) {
        this.token = token;
        this.sender = sender;
        this.debug = debug || false;
    }

    /**
     * The setconfig() function returns an object with two properties: hostname and appurl.
     * @returns An object with two properties.
     */
    setconfig() {
        return {
            hostname: 'api.trenalyze.com',
            appurl: 'https://trenalyze.com'
        }
    }

    /**
     * It sends a message to a user
     * @param details - {
     * @param result - The callback function that will be called when the request is complete.
     * @returns The result of the function is being returned.
     */
    sendMessage(details, result) {

        /* It's destructuring the details object. */
        const { receiver, message, mediaurl, buttons } = details;

        /* It's checking if the value of the receiver, message, mediaurl, and buttons variables are
        false. */
        if (!(receiver && message && buttons)) {

            /* It's checking if the value of the debug property of the Trenalyze class is true. If it
            is, it's logging the string 'Error: Missing parameters. Please Refer to documentation'
            to the console. */
            if (this.debug) console.log('Missing parameters. Please Refer to documentation');
            const info = {
                /* It's creating an object with two properties: statusCode and statusMessage. */
                statusCode: 400,
                statusMessage: 'Bad Request'
            }

            /* It's calling the result function and passing null and info as arguments. */
            result(null, info);
        } else {
            /* It's destructuring the object returned by the verifyParams() function. */
            const { errors, valid } = verifyParams(
                /* It's calling the setconfig() function and returning the hostname property of the object
                returned by the setconfig() function. */
                this.setconfig().hostname,

                /* It's calling the setconfig() function and returning the appurl property of the object
                returned by the setconfig() function. */
                this.setconfig().appurl,

                /* It's calling the token and sender properties of the Trenalyze class. */
                this.token, this.sender,

                /* It's calling the message property of the details object. */
                details.message,

                /* It's calling the receiver property of the details object. */
                details.receiver
            );

            /* It's checking if the value of the valid variable is false. If it is, it's logging the errors
            to the console and returning the result of the function. */
            if (!valid) {

                /* It's checking if the value of the debug property of the Trenalyze class is true. If it
                is, it's logging the errors to the console. */
                if (this.debug) console.log(errors);

                /* It's creating an object with two properties: statusCode and statusMessage. */
                const info = {

                    /* It's creating an object with two properties: statusCode and statusMessage. */
                    statusCode: 400,
                    statusMessage: 'Bad Request'
                }

                /* It's calling the result function and passing null and info as arguments. */
                result(null, info);

                /* It's returning the result of the function. */
                return;
            } else {
                /* It's checking if the value of the mediaurl property of the details object is not an empty
                string. */
                if (details.mediaurl !== '') {

                    /* It's destructuring the object returned by the verifyMediaUrl() function. */
                    const { errors, valid } = verifyMediaUrl(details.mediaurl);

                    /* It's checking if the value of the valid variable is false. If it is, it's logging the
                    errors to the console and returning the result of the function. */
                    if (!valid) {

                        /* It's checking if the value of the debug property of the Trenalyze class is true.
                        If it is, it's logging the errors to the console. */
                        if (this.debug) console.log(errors);

                        /* It's creating an object with two properties: statusCode and statusMessage. */
                        const info = {
                            statusCode: 400,
                            statusMessage: 'Bad Request'
                        }

                        /* It's calling the result function and passing null and info as arguments. */
                        result(null, info);

                        /* It's returning the result of the function. */
                        return;
                    }
                }

                /* It's calling the _request() function and passing 'POST', an object with five properties,
                and a function as arguments. */
                return this._request('POST', {
                        /* It's calling the receiver property of the details object and assigning it to the
                        receiver
                        property of the object passed as the second argument to the _request() function. */
                        receiver: details.receiver,

                        /* It's assigning the value of the message property of the details object to the
                        msgtext property of the object passed as the second argument to the _request()
                        function. */
                        msgtext: details.message,

                        /* It's assigning the value of the sender property of the Trenalyze class to the sender
                        property of the object passed as the second argument to the _request() function. */
                        sender: this.sender,

                        /* It's assigning the value of the token property of the Trenalyze class to the token
                        property of the object passed as the second argument to the _request() function. */
                        token: this.token,

                        /* It's calling the setconfig() function and returning the appurl property of the object
                        returned by the setconfig() function. */
                        appurl: this.setconfig().appurl,

                        /* It's assigning the value of the mediaurl property of the details object to the
                        mediaurl property of the object passed as the second argument to the _request()
                        function. */
                        mediaurl: details.mediaurl,

                        /* It's assigning the value of the buttons property of the details object to the
                        buttons property of the object passed as the second argument to the _request()
                        function. */
                        buttons: details.buttons

                    },
                    /* It's a function that is being passed as an argument to the _request() function. */
                    (error, data) => {
                        /* It's calling the result function and passing null and data as arguments. */
                        result(null, data);

                        /* It's returning the result of the function. */
                        return;
                    });
            }
        }
    }

    /**
     * The _request() function is a private function that makes a request to Trenalyze.com.
     * @param method - The HTTP method to use.
     * @param data - The data to send to the server.
     * @param result - The callback function that will be called when the request is complete.
     * @returns The result of the request.
     */
    _request(method, data, result) {

        /* It's creating an object with five properties. */
        const options = {

            /* It's assigning the value of the method variable to the method property of the options
            object. */
            'method': method,

            /* It's calling the setconfig() function and returning the hostname property of the object
            returned by the setconfig() function. */
            'hostname': this.setconfig().hostname,

            /* It's setting the port to 443. */
            'port': 443,

            /* It's setting the path to /send. */
            'path': '/send',

            /* It's setting the Content-Type header to application/json. */
            'headers': {
                'Content-Type': 'application/json'
            }
        };

        /* It's creating a new Promise object and returning it. */
        return new Promise((resolve, reject) => {

            /* It's creating a new request object. */
            const req = https.request(options, (res) => {

                /* It's creating an empty array. */
                const chunks = [];

                /* It's pushing the chunk to the chunks array and logging the chunk to the console. */
                res.on("data", (chunk) => {

                    /* It's pushing the chunk to the chunks array. */
                    chunks.push(chunk);

                    /* It's logging the chunk to the console. */
                    if (this.debug) {
                        process.stdout.write(chunk);
                    }

                    /* It's calling the result function and passing null and res as arguments. */
                    result(null, res);

                    /* It's returning the result of the function. */
                    return;
                });

                /* It's creating a new Promise object and returning it. */
                res.on("end", () => {

                    /* It's concatenating the chunks array and assigning it to the body variable. */
                    const body = Buffer.concat(chunks);

                    /* It's converting the body to a string and returning it. */
                    resolve(body.toString());
                });

                /* It's rejecting the error. */
                res.on("error", (error) => {

                    /* It's rejecting the error. */
                    reject(error);
                });
            });

            /* It's checking if the value of the data variable is not null. If it is not, it's writing the
            data to the request object. */
            if (data) {

                /* It's writing the data to the request object. */
                req.write(JSON.stringify(data));
            }

            /* It's ending the request. */
            req.end();
        });

    }
}

/* It's exporting the Trenalyze class so that it can be used in other files. */
module.exports = Trenalyze;