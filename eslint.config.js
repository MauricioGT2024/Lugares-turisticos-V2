import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
	{ ignores: ['dist'] },
	{
		files: ['**/*.{js,jsx}'],
		env: {
			node: true,
			es2021: true,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			extends: ['eslint:recommended'],
			parserOptions: {
				ecmaVersion: 12,
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},

			rules: {
				indent: ['error', 2],
				'linebreak-style': ['error', 'unix'],
				quotes: ['error', 'single'],
				semi: ['error', 'always'],
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
];
