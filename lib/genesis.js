var colors = require('colors');
var fs = require('fs');
var path = require('path');
var parser = require('./parser.js');
var cwd = process.cwd();

var Genesis = function(){
	'use strict'

	var args;
	var config;

	var validateTpl = function(tpl) {
		fs.exists(path.join(cwd, 'templates', tpl), function(exists) {
			if(exists) {
				validateRecipe(tpl);
			} else {
				console.error(("Template (" + tpl + ") not found. Please check the name.").red);
			}
		});
	};

	var validateRecipe = function(tpl) {
		fs.exists(path.join(cwd, 'templates', tpl, 'config.js'), function(exists) {
			if (exists) {
				startRecipe(tpl);
			} else {
				console.error(("config.js not found in " + tpl + " folder.").red);
			}
		});
	};

	var startRecipe = function(tpl) {
		config = require(path.join(cwd, 'templates', tpl, 'config.js'));
		parser.init(config, args);
	};

	return {
		
		"init" : function() {
			args = arguments['0'];

			validateTpl(args[0]);
		},

		"list" : function() {
			var tpls = fs.readdirSync(path.resolve(__dirname,'../templates'));

			console.log("List of available templates:");
			console.log("");

			var i = 0;
			var len = tpls.length;
			for (; i < len; i++) {
				console.log(('. ' + tpls[i]).green);
			};

			console.log("");
			console.log("$ genesis <tplname> --doc");
			console.log("To read more details about the generator");
		}
	};

};

module.exports = new Genesis();
