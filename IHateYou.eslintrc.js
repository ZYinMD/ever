module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/extensions': [0],
    'import/no-named-as-default': [0],
    'func-names': ['error', 'never'],
    'global-require': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true },
      ObjectPattern: { multiline: true },
      ImportDeclaration: { multiline: true },
      ExportDeclaration: { multiline: true },
    }],
  },
};
