'use strict';
var test = require('ava');
var bufferEquals = require('buffer-equals');
var stdin = require('./');

test('get stdin as a buffer', function (t) {
	process.stdin.isTTY = false;

	var promise = stdin.buffer(function (data) {
		t.true(bufferEquals(data, new Buffer('unicorns')));
		t.is(data.toString().trim(), 'unicorns');
	});

	process.stdin.push(new Buffer('unicorns'));
	process.stdin.emit('end');

	return promise;
});

test('get empty buffer when no stdin', function (t) {
	process.stdin.isTTY = true;

	return stdin.buffer(function (data) {
		t.true(bufferEquals(data, new Buffer('')));
	});
});
