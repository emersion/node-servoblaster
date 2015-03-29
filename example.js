var readline = require('readline');
var servoblaster = require('./index');

var stream = servoblaster.createWriteStream(0);

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var prompt = function () {
	rl.question("", function (value) {
		stream.write(parseInt(value));
		prompt();
	});
};

console.log('Type values to control ServoBlaster.');
prompt();
