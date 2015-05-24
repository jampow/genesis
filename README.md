# GENESIS

Easily configurable generator

```
projeto
	+ genesis
		+ src
			genesis.js
		+ tpls
			+ modulo-site-web
				config.js
				+ templates
					file1.js
					file2.css
					file3.htm
			+ modulo-site-mobile
				config.js
				+ templates
					file1.js
					file2.css
					file3.htm
			+ modulo-site-web
				config.js
				+ templates
					file1.js
					file2.css
					file3.htm
			+ modulo-site-mobile
				config.js
				+ templates
					file1.js
					file2.css
					file3.htm


config.js
{
	file1.js -> jsuol.com/c/.../modulo.js
	file2.css -> jsuol.com/c/.../${1}/modulo.css
	file2.css -> jsuol.com/c/.../${1}/modulo.css
	file3.htm -> jsuol.com/c/.../${1}.htm
	reminders
}


$ genesis modulo-site-mobile nome-modulo
