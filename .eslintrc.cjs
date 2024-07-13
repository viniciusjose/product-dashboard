module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "react-hooks/rules-of-hooks": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "react/react-in-jsx-scope": "off",
        "react/no-children-prop": "off"
    },
}
