var fs = require('fs');
var through = require('through');

var SERVOBLASTER_DEV = '/dev/servoblaster';

var servoblaster = {};

servoblaster.createWriteStream = function (pin) {
	var stream = fs.createWriteStream(SERVOBLASTER_DEV);

	var servo = through(function write (data) {
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