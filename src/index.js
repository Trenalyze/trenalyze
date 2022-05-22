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
            result(null, info);
            return;
        } else {
            if (details.mediaurl !== '') {
                const { errors, valid } = verifyMediaUrl(details.mediaurl);
                if (!valid) {
                    if (this.debug) console.log(errors);
                    const info = {
                        statusCode: 400,
                        statusMessage: 'Bad Request'
                    }
                    result(null, info);
                    return;
                }
            }

            return this._request('POST', {
                receiver: details.receiver,
                msgtext: details.message,
                sender: this.sender,
                token: this.token,
                appurl: this.setconfig().appurl,
                mediaurl: details.mediaurl,
                buttons: details.buttons
            }, (error, data) => {
                result(null, data);
                return;
            });
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
        const options = {
            'method': method,
            'hostname': this.setconfig().hostname,
            'port': 443,
            'path': '/send',
            'headers': {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                const chunks = [];

                res.on("data", (chunk) => {
                    chunks.push(chunk);
                    if (this.debug) {
                        process.stdout.write(chunk);
                    }
                    result(null, res);
                    return;
                });

                res.on("end", () => {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                });

                res.on("error", (error) => {
                    reject(error);
                });
            });
            if (data) {
                req.write(JSON.stringify(data));
            }
            req.end();
        });

    }
}

/* It's exporting the Trenalyze class so that it can be used in other files. */
module.exports = Trenalyze;