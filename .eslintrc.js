module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', 'plugin:perfectionist/recommended-natural'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  root: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 0,
    'space-before-function-paren': 0
  }
}
