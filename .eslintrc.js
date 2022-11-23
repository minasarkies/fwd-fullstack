module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['temp.js', '**/vendor/*.js'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'double'],
  },
};
