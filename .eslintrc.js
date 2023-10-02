module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    'plugin:perfectionist/recommended-natural',
    'prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  root: true,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 0,
    'perfectionist/sort-vue-attributes': 0,
    'space-before-function-paren': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'never',
          void: 'always'
        },
        svg: 'always'
      }
    ]
  }
}
