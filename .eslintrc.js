module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
    ],
  },
};
