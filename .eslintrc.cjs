/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:@cloudflight/typescript/recommended', 'plugin:storybook/recommended'],
    parserOptions: {
        project: ['tsconfig.*?.json'],
        ecmaVersion: 'latest',
    },
    rules: {
        '@cloudflight/typescript/package-force-absolute-version-dependencies': 'off',
    },
};
