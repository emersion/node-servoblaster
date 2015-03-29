# node-servoblaster

ServoBlaster library for Node.js.

Docs: https://github.com/richardghirst/PiBits/blob/master/ServoBlaster/README.txt

## Usage

```js
var servoblaster = require('servoblaster');

var stream = servoblaster.createWriteStream(0); // Open pin 0 (optional)

// Examples
stream.write(150); // Specify as a number of steps
stream.write('50%'); // Specify as a percentage
stream.write('1500us'); // Specify as microseconds
stream.write({ pin: 0, value: 150 }); // Specify ServoBlaster ID
stream.write({ pin: 'P1-7', value: 150 }); // Specify pin number

stream.end();
```
