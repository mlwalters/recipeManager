module.exports = {
  env: {
    browser: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'cypress',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.test.jsx', '**/*_def.js', 'cypress/**/**'] }],
    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'warn',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
};
