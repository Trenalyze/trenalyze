const Trenalyze = require('trenalyze');

require('dotenv').config();

const token = process.env.TRENALYZE_TOKEN;
const sender = process.env.TRENALYZE_SENDER;

const details = {
    receiver: '2348157002782',
    message: 'Hello Treasure',
    mediaurl: '',
    buttons: [{
        text: 'Click Me',
        url: 'https://trenalyze.com'
    }]
};
const wa = new Trenalyze(token, sender, true);

wa.sendMessage(details, (error, data) => {
    if (data.statusCode !== 200) {
        console.log('Error: ' + data.statusMessage);
    } else {
        console.log('Success ' + data.statusMessage);
    }
});