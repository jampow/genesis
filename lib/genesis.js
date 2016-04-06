var fs = require('fs');
var path = require('path');

var colors = require('colors');
var inquirer = require('inquirer');

var parser = require('./parser.js');

var cwd = process.cwd();

var Genesis = function(){
	'use strict'

	var args;
	var config;

	var validateTpl = function(tpl) {
		var exists = fs.existsSync(path.join(cwd, 'templates', tpl));

		if(exists) {
			return true;
		} else {
			console.error(("Template (" + tpl + ") not found. Please check the name.").red);
			return false;
		}
	};

	var loadConfig = function(tpl) {
		var configPath = path.join(cwd, 'templates', tpl, 'config.js');

		var exists = fs.existsSync(configPath);

		if (exists) {
			config = require(configPath);
			return true;
		} else {
			console.error(("config.js not found in " + tpl + " folder.").red);
			return false;
		}
	};

	var startRecipe = function(tpl) {
		parser.init(config, args);
	};

	var showDocs = function(tpl) {
		var len = config.doc.length;
		var i = 0;

		for(; i < len; i++)
			console.log(config.doc[i]);

	};

	var start = function(tpl) {
		if(validateTpl(tpl) && loadConfig(tpl))
			startRecipe(tpl);
	};

	return {
		
		"init" : function(args) {
			var tpl = args[0];
			start(tpl);
		},

		"choseGenerator": function() {
			var tpls = fs.readdirSync(path.join(cwd, 'templates'));

			if(tpls.length === 1){
				var tpl = tpls[0];

				console.log("Iniciando único generator disponível", (tpl).green);

				start(tpl);
			} else {
				var question = [
					{
						type: "list",
						name: "tpl",
						message: "Você não passou nenhum generator. Escolha um na lista abaixo.",
						choices: tpls,
						filter: function(value){
							return value.toLowerCase();
						}
					}
				];

				inquirer.prompt(question, function (answer) {
					start(tpl);
				});
			}
		},

		"list" : function() {
			var tpls = fs.readdirSync(path.join(cwd, 'templates'));

			console.log("List of available templates:");
			console.log("");

			var i = 0;
			var len = tpls.length;
			for (; i < len; i++) {
				console.log(('. ' + tpls[i]).green);
			};

			console.log("");
			console.log("$ genesis <tplname> --help");
			console.log("To read more details about the generator");
		},

		"help" : function() {
			args = arguments[0];
			var tpl = args[0];

			if(validateTpl(tpl) && loadConfig(tpl))
				showDocs(tpl);
		}
	};

};

module.exports = new Genesis();
