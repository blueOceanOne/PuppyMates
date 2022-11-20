module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
  plugins: ['prettier'],
};
