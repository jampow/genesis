module.exports = {
	"files" : [
		{ 
			"filename": "file1.htm",
			"to": "{{arg1}}/path/with/many/folders/file1.htm"
		},
		{ 
			"filename": "file2.js",
			"to": "other/path/with/many/folders/file2.js"
		}
	],
	"tips" : [
		"Dont forget to put the module's config inside the array in /config/modules.js",
		"Good luck, you'll need"
	],
	"doc" : [
		"This will be showed when passed the --help flag.",
		"Each array item will be displayed in a new line.",
		"",
		"You can pass a blank item for a better organization of your help.",
		"",
		"Describe each parameter that should be passed to this generator."
	],
	"helpers" : {
		"date" : function(){
			return new Date('dd-mm-yyyy');
		}
	}
}
