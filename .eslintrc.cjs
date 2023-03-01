/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:@cloudflight/typescript/recommended', 'prettier', 'plugin:storybook/recommended'],
    parserOptions: {
        project: ['tsconfig.*?.json'],
        ecmaVersion: 'latest',
    },
};
