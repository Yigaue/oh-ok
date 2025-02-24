import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    }
  },
  js.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'no-unused-vars': 'warn'
    }
  }
];
