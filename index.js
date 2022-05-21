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

    _request(method, data, result) {
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

module.exports = Trenalyze;