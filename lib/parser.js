var fs = require('fs');
var path = require('path');
var mu = require('mu2');

var Parser = function(){
	'use strict'

	var filesList;
	var args = {};

	var startParsing = function(){
		mu.root = path.resolve(__dirname, '../templates/');

		var listSize = filesList.length;
		var i = 0;
		for (; i < listSize; i++) {
			console.log(filesList[i]);

			var from = args.tpl + '/' + filesList[i].filename;
			var to = path.resolve(__dirname, '..', filesList[i].to);

			console.log(from)
			console.log(to)
			mu.compileAndRender(from, args)
				.on('data', function(data){
					console.log(data+'');
				});
		};
	};

	return {
		"init" : function(files, params) {
			filesList = files;

			params.map(function(item, idx){
				if(idx == 0) {
					args.tpl = item;
				} else {
					args['arg' + idx] = item;
				}
			});

			startParsing();
		}
	};
}

module.exports = new Parser();