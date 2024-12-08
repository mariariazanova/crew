import { Linter } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import angularPlugin from '@angular-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintParser from '@typescript-eslint/parser';

/** @type {Linter.FlatConfig[]} */
const config = [
  {
    ignores: ['node_modules', 'dist', 'package-lock.json', '.angular/cache'],
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, printWidth: 80, trailingComma: 'es5' },
      ],
    },
  },
];

export default config;
