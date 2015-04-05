var fs = require('fs');
var path = require('path');
var mu = require('mu2');
var fse = require('fs-extra');

var Parser = function(){
	'use strict'

	var filesList;
	var args = {};

	var startParsing = function(){

		var listSize = filesList.length;
		var i = 0;
		for (; i < listSize; i++) {
			var from = args.tpl + '/' + filesList[i].filename;
			var to = path.resolve(__dirname, '..', filesList[i].to);
			var content = '';

			fse.mkdirsSync(path.dirname(to));

			parse(from, to, args);

		};
	};

	var parse = function(from, to, args) {
		var content = '';
		mu.root = path.resolve(__dirname, '../templates/');
		
		mu.compileAndRender(from, args)
			.on('data', function(data) {
				content += data;
			}).on('end', function(data) {
				writeFile(to, content);
				content = '';
			});
	};

	var writeFile = function(to, content) {
		fs.writeFile(to, content, 'utf-8', function(err) {
			if(err) { throw err; }
			var projRoot = path.resolve(__dirname, '..');
			var newFile = to.replace(projRoot + '/', '');
			console.log(('Created:\t' + newFile).green);
		});
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