#!/usr/bin/env node

var program = require('commander');
var genesis = require('./lib/genesis.js');

program
	.version('1.0.0')
	.option('-l, --list', 'Show help')
	.option('-d, --doc', 'Show generator doc');

//program.on('--help', function() {
	//console.log(program.args);
//});

program.parse(process.argv);

if(program.list) {
	genesis.list();
} else if(program.doc) {
	genesis.help(program.args);
} else {
	if(program.args.length > 0)
		genesis.init(program.args);
	else
		genesis.choseGenerator();
}
