var colors = require('colors');
var fs = require('fs');

var Genesis = function(){
	'use strict'

	var args;
	var config;

	var validateTpl = function(tpl) {
		fs.exists('templates/' + tpl, function(exists) {
			if(exists) {
				validateRecipe(tpl);
			} else {
				console.error(("Template (" + tpl + ") not found. Please check the name.").red);
			}
		});
	};

	var validateRecipe = function(tpl) {
		fs.exists('templates/' + tpl + '/config.js', function(exists) {
			if (exists) {
				readRecipe(tpl);
			} else {
				console.error(("config.js not found in " + tpl + " folder.").red);
			}
		});
	};

	var readRecipe = function(tpl) {
		config = require('../templates/' + tpl + '/config.js');
		console.log(config);
	};

	return {
		"init" : function() {
			args = arguments['0'];

			validateTpl(args[0]);
		}
	};

};

module.exports = new Genesis();