# trenalyze

[Author](https://treasureuvietobore.com/) |
[Docs](https://github.com/Trenalyze/trenalyze#readme)


## Installation


Using npm:
```shell
$ npm i trenalyze
```
Note: add `--save` if you are using npm < 5.0.0

In Node.js:
```js
// Load the full build.
const trenalyze = require('trenalyze');

// Set The Config
const config = {
    token: process.env.TRENALYZE_TOKEN,
    sender: process.env.TRENALYZE_SENDER
}

// Set the Required Parameters for sending message 
const details = {
    receiver: '123456789',
    message: 'Hello World',
    mediaurl: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    buttons: [{
        text: 'Click Me',
        url: 'https://trenalyze.com'
    }]
}

// Initialize the send whatsapp message functions
trenalyze.sendMessage(config, details, (error, data) => {
    if (data.statusCode !== 200) {
        res.status(500).send({
            message: "Some error occurred while sending whatsapp Message"
        });
    } else {
        res.status(201).json({
            status: 'success',
            wa_response: true
        });
    }
})

```
