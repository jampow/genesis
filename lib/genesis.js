var colors = require('colors');
var fs = require('fs');

var Genesis = function(){
	'use strict'

	var args = arguments;

	var validateTpl = function(tpl) {
		fs.exists('templates/' + tpl, function(exists) {
			if(exists) {
				console.log('go ahead');
			} else {
				console.error(("Template (" + tpl + ") not found. Please check the name.").red);
			}
		});
	}

	return {
		"init" : function() {
			args = arguments['0'];

			validateTpl(args[0]);
		}
	}

};

module.exports = new Genesis();