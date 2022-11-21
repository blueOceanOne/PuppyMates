module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended', 'eslint-config-prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
    'react/style-prop-object': [
      'error',
      {
        allow: ['StatusBar'],
      },
    ],
  },
  plugins: ['prettier'],
};
