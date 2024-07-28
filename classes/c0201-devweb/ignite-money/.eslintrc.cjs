module.exports = {
  extends: [
    '@rocketseat/eslint-config/react',
  ],
  rules: {
    "react/self-closing-comp": "error",
    'prettier/prettier': ["error", {
      'printWidth': 80,
      'tabWidth': 2,
      'singleQuote': false,
      'trailingComma': 'all',
      'arrowParens': 'always',
      'semi': true,
      'endOfLine': 'auto',
      'jsxSingleQuote': false
    }],
  }
}
