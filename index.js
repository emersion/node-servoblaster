var fs = require('fs');
var util = require('util');
var Transform = require('stream').Transform;

var SERVOBLASTER_DEV = '/dev/servoblaster';

var servoblaster = {};

servoblaster.Transform = function (options) {
	if (!(this instanceof servoblaster.Transform)) {
		return new servoblaster.Transform(options);
	}

	if (!options) options = {};
	options.objectMode = true;
	Transform.call(this, options);

	this.pin = options.pin;
};
util.inherits(servoblaster.Transform, Transform);

servoblaster.Transform.prototype._transform = function (chunk, enc, cb) {
	var pin = (chunk.pin || chunk.pin === 0) ? chunk.pin : this.pin;
	var value = chunk.value || chunk;
	if (!pin && pin !== 0) {
		return cb('No pin specified');
	}
	if (!value && value !== 0) { 
                return cb('No value specified');
        }
	this.push(pin+'='+value+'\n', enc);
	cb();
};

servoblaster.createWriteStream = function (pin) {
	var stream = fs.createWriteStream(SERVOBLASTER_DEV);
	var servo = servoblaster.Transform({ pin: pin });
	servo.pipe(stream);

	stream.on('error', function (err) {
		servo.emit('error', err);
	});
	stream.on('open', function () {
		servo.emit('open');
	});

	return servo;
};

module.exports = servoblaster;
