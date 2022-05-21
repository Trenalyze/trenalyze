//require('dotenv').config();
const https = require('https');


class Trenalyze {
    constructor(token, sender) {
        this.hostname = 'api.trenalyze.com';
        this.token = token;
        this.sender = sender;
    }

    setconfig(token, sender) {
        return {
            token: token,
            sender: sender,
            appurl: 'https://trenalyze.com'
        }
    }

    testSend(details) {
        return this._request('POST', {
            receiver: details.receiver,
            msgtext: details.message,
            sender: this.sender,
            token: this.token,
            appurl: this.setconfig().appurl,
            mediaurl: details.mediaurl,
            buttons: details.buttons
        });
    }

    sendMessage(details, result) {
        const data = JSON.stringify({
            receiver: details.receiver,
            msgtext: details.message,
            sender: this.sender,
            token: this.token,
            appurl: this.setconfig().appurl,
            mediaurl: details.mediaurl,
            buttons: details.buttons
        });

        const options = {
            hostname: 'api.trenalyze.com',
            port: 443,
            path: '/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
            console.log(`
                    statusCode: $ { res.statusCode }
                    `);

            // console.log('headers:', res.headers);
            res.on('data', d => {

                process.stdout.write(d);
                result(null, res);
                return;

            })
        })

        req.on('error', error => {
            console.error(error);
            const info = {

            }
            result(null, error);
            return;
        })

        req.write(data);
        req.end();

        /* private */

    }

    _request(method, data) {
        const options = {
            'method': method,
            'hostname': this.hostname,
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
                    process.stdout.write(chunk);
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

module.exports = Trenalyze;