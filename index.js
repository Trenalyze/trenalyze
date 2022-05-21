/* It's a Node.js module that allows you to make HTTPS requests. */
const https = require('https');


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

    /* It's a function that sends a message to a user on Trenalyze.com. */
    sendMessage(details, result) {
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