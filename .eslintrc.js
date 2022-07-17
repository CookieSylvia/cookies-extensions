module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['canonical', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'prefer-arrow-callback': 'error',
        'object-curly-newline': [
            'error',
            {
                ImportDeclaration: { multiline: true, minProperties: 2 },
                ExportDeclaration: { multiline: true, minProperties: 2 },
            },
        ],
        'canonical/import-specifier-newline': 'error',
        'canonical/export-specifier-newline': 'error',
    },
}
