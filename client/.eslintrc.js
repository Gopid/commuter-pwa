module.exports = {
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            modules: true,
            jsx: true
        }
    },
    settings: {
        react: {
            pragma: 'h'
        }
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'max-len': 0,
    }
}