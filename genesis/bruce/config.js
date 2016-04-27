module.exports = {
	"questions" : [
		{
			"name": "name",
			"message": "Give a name to the component."
		},
		{
			"name": "files",
			"type": "checkbox",
			"message": "chose the files you want.",
			"choices": [
				"controller.vm",
				"view.htm",
				"script.js"
			]
		}
	],
	"files" : [
		{ 
			"filename": "view.htm",
			"to": "{{comp}}/path/with/many/folders/view.htm"
		},
		{ 
			"filename": "controller.vm",
			"to": "other/path/with/many/folders/controller.vm"
		},
		{ 
			"filename": "script.js",
			"to": "other/path/with/many/folders/script.js"
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
