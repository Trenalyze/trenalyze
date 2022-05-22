# trenalyze

[Author](https://treasureuvietobore.com/) |
[Docs](https://github.com/Trenalyze/trenalyze#readme)


## Library Prerequisites

1. Node >= 12x
1. WhatsApp account.
1. Active Token - Get a Token [here](https://trenalyze.com).


## Installation


Using npm:
```shell
$ npm i trenalyze
```
**Note:** add `--save` if you are using npm < 5.0.0

In Node.js:

**Note:** You'll need to require the Trenalyze npm Module after installation

```js
// Load the full build.
const Trenalyze = require('trenalyze');
```
## API

### 1. new Trenalyze(token, sender, true)

| Param | Type | Description |
| --- | --- | --- |
| token | `string` | Use your Trenalyze Token from your [Dashboard](https://trenalyze.com). |
| sender | `interger` | Enter the WhatApp Number that has already be scanned on the Trenalyze [Dashboard](https://trenalyze.com). |
| debug | `boolean` | (OPTIONAL). Default is false. But you can set to be true and the debug message is passed onto the console. |
```js
// Set The Config
const wa = new Trenalyze(YOUR_TRENALYZE_TOKEN_HERE, YOUR_WHATASPP_NUMBER_HERE, true);
```

**Note:** Phone number should be in following format `12345678912`, without `+` or any other symbols

### 2. Initialize needed params in an array 

| Param | Type | Description |
| --- | --- | --- |
| receiver | `interger` | Phone number should be in following format `12345678912`, without `+` or any other symbols. |
| message | `interger` | Enter the desired text message to send. |
| mediaurl | `string` | (OPTIONAL). **BUT MUST BE DECLARED** This should be a valid media/file link. [Learn More](https://trenalyze.com) |
| buttons | `array` | (OPTIONAL). **BUT MUST BE DECLARED** You can attach quick replies buttons to your message. [Learn More](https://trenalyze.com) |
```js
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
```
**NOTE:** When not using **mediaurl** and **buttons** set to **NULL**
```js
mediaurl: '',
buttons: ''
```

### 3. Initialize SendMessage

| Param | Type | Description |
| --- | --- | --- |
| details | `variable` | Send the variable declared in step **2** |

```js
// Initialize the send whatsapp message functions
wa.sendMessage(details, (error, data) => {
    if (data.statusCode !== 200) {
        console.log('Error: ' + data.statusMessage);
    } else {
        console.log('Success ' + data.statusMessage);
    }
});

```
