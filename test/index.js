const Trenalyze = require('trenalyze');



const token = 'w0bW6GuaQjKUog5GXOJb';
const sender = '2347019491161';

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
console.log('All Test Completed');
process.exit(0);