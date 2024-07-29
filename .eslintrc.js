module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  extends: [
    './.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
  },
};
