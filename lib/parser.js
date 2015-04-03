var fs = require('fs');
var path = reqire('path');

var Parser = function(){
	'use strict'

	var filesList;
	var args = {};

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
		}
	};
}

module.exports = new Parser();