var program = require('commander');
var genesis = require('./lib/genesis.js');

program
	.version('1.0.0')
	.parse(process.argv);

genesis.init(program.args);
