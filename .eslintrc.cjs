/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:@cloudflight/typescript/recommended', 'prettier'],
    parserOptions: {
        project: ['tsconfig.*?.json'],
        ecmaVersion: 'latest',
    },
};
