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
    'no-else-return': 'off',
    'nonblock-statement-body-position': [0],
    'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true }],
    'prefer-template': [0],
    curly: [0],
    'max-len': [0],
    'class-methods-use-this': [0],
    'react/prop-types': [0],
    'prefer-const': [0],
    'no-multi-assign': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: false,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: { consistent: true },
      ObjectPattern: { consistent: true },
      ImportDeclaration: { multiline: true },
      ExportDeclaration: { multiline: true },
    }],
    'react/sort-comp': ['1', {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }],
  },
};
