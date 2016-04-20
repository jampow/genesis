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

	var loadConfig = function(tpl) {
		var configPath = path.join(cwd, 'genesis', tpl, 'config.js');

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
		inquirer.prompt(config.questions, function (answers) {
			parser.init(config, answers);
		});
	};

	var showDocs = function(tpl) {
		var len = config.doc.length;
		var i = 0;

		for(; i < len; i++)
			console.log(config.doc[i]);

	};

	var start = function(tpl) {
		if(loadConfig(tpl))
			startRecipe(tpl);
	};

	return {
		
		"init" : function() {
			var tpls = fs.readdirSync(path.join(cwd, 'genesis'));

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
				start(answer.tpl);
			});
		},

		"list" : function() {
			var tpls = fs.readdirSync(path.join(cwd, 'genesis'));

			console.log("List of available generators:");
			console.log("");

			var i = 0;
			var len = tpls.length;
			for (; i < len; i++) {
				console.log(('. ' + tpls[i]).green);
			};

			console.log("");
			console.log("$ genesis <tplname> --help");
			console.log("To read more details about the generator");
		}
	};

};

module.exports = new Genesis();
