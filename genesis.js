#!/usr/bin/env node

var program = require('commander');
var genesis = require('./lib/genesis.js');

program
	.version('1.0.0')
	.option('-l, --list', 'Show help');

program.on('--help', function() {
	console.log(program.args);
});

program.parse(process.argv);

if(program.list) {
	genesis.list();
} else {
	genesis.init(program.args);
}
