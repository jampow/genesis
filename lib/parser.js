var fs = require('fs');
var path = require('path');
var mu = require('mu2');
var fse = require('fs-extra');
var cwd = process.cwd();

var Parser = function(){
	'use strict'

	var args = {};
	var filesList;
	var tips;

	var startParsing = function(){

		var listSize = filesList.length;
		var i = 0;
		for (; i < listSize; i++) {
			var from = args.tpl + '/' + filesList[i].filename;
			var to = pathParse(path.join(cwd, filesList[i].to));
			console.log('to', to);
			var content = '';

			fse.mkdirsSync(path.dirname(to));

			parse(from, to, args);

		};
	};
	
	var pathParse = function(path) {

		var keys = path.match(/\{\{([^\}]+)\}\}/g);
		var len = keys.length;

		if(len) {
			var i = 0;

			for(;i < len; i++){
				var key = keys[i];
				var param = key.replace(/\{|\}/g, '');
				path = path.replace(key, args[param]);
			}
		}

		return path;
	};

	var parse = function(from, to, args) {
		var content = '';
		mu.root = path.join(cwd, 'genesis');
		
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
			var newFile = to.replace(cwd + '/', '');
			console.log(('Created:\t' + newFile).green);
		});
	};

	var showTips = function() {
		var tipslen = tips.length;
		if(tipslen > 0) {
			var i = 0;
			var j = 1;
			for(; i < tipslen; i++, j++) {
				console.log((j + '. ' + tips[i]).yellow);
			};
			
			console.log('');
		}
	};

	return {
		"init" : function(config, params) {
			filesList = config.files;
			tips = config.tips

			params.map(function(item, idx){
				if(idx == 0) {
					args.tpl = item;
				} else {
					args['arg' + idx] = item;
				}
			});

			startParsing();

			showTips();
		}
	};
}

module.exports = new Parser();
