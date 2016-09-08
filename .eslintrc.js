module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true
  },
  rules: {
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used' }],
    'indent': [2, 2, {
      'VariableDeclarator': {
        'let': 2,
        'const': 3
      },
      'SwitchCase': 1
    }],
    'quotes': [2, 'single'],
    'linebreak-style': [2, 'unix'],
    'semi': [2, 'always'],
    'eol-last': 2,
    'no-var': 2,
    'prefer-const': 2,
    'no-multiple-empty-lines': [2, { max: 2 }],
    'no-console': 0,
    'no-extra-bind': 2,
    'no-undef': 2
  }
}
