module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['prettier', 'plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    // '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.d.ts', '.ts', '.tsx'],
      },
      node: {
        paths: ['src'],
        extensions: ['.d.ts', '.ts', '.tsx'],
      },
    },
  },
};
