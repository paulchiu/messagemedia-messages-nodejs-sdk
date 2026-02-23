'use strict';

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: ['node_modules/**'],
    },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.mocha,
            },
        },
        rules: {
            indent: ['error', 4],
            'no-underscore-dangle': 'off',
            strict: 'off',
            'prefer-rest-params': 'off',
        },
    },
];
