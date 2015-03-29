var fs = require('fs');
var through = require('through');

var SERVOBLASTER_DEV = '/dev/servoblaster';

var servoblaster = {};

servoblaster.createWriteStream = function (pin) {
	var stream = fs.createWriteStream(SERVOBLASTER_DEV);

	var servo = through(function write (data) {
		if (!pin && pin !== 0) {
			if (typeof data.pin != 'undefined') {
				pin = data.pin;
			}
			if (typeof data.value != 'undefined') {
				data = data.value;
			}
			if (!pin && pin !== 0) {
				throw new Error('No pin specified');
			}
		}
		if (!data && data !== 0) {
			throw new Error('No value specified');
		}
		stream.write(pin+'='+data);
	}, function end () {
		stream.end();
		this.emit('end');
	});

	stream.on('end', function () {
		servo.end();
	});

	return servo;
};

module.exports = servoblaster;