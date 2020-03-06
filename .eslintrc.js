module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 20
    }],
    'vue/attribute-hyphenation': ['error', 'always', {
      ignore: ['viewBox']
    }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/this-in-template': ['error', 'never'],
    'vue/no-v-html': 0,
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'never'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass: false,
      allowCoexistStyle: false
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    // don't care about quotes
    quotes: 'warn',
    // allow debugger during development
    'no-undefined': 1,
    'no-var': 'error',
    'prefer-promise-reject-errors': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
