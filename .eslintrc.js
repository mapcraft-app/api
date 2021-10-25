module.exports = {
	env: {
		node: true,
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'brace-style': ['warn', 'allman'],
		'class-methods-use-this': 'off',
		curly: ['warn', 'multi', 'consistent'],
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'max-classes-per-file': ['error', 2],
		'max-len': ['warn', {
			code: 180,
			ignoreComments: true,
			ignoreStrings: true,
			ignoreRegExpLiterals: true,
			ignoreTemplateLiterals: true,
		}],
		'no-plusplus': ['off', false],
		'no-underscore-dangle': ['off'],
		'no-tabs': ['off', { allowIndentationTabs: true }],
		'no-restricted-syntax': ['off'],
		'no-console': 'off',
		'nonblock-statement-body-position': ['warn', 'below'],
		'spaced-comment': ['error', 'always', { markers: ['#region '] }],
	},
};
