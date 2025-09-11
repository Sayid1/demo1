module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:vue/essential'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue'],
	rules: {
		'space-before-function-paren': 0
	},
	globals: {
		module: true,
		uni: true,
		wx: true,
		getCurrentPages: true,
		require: true,
		__dirname: true,
		tt: true,
		getApp: true,
		process: true,
		plus: true
	}
}
