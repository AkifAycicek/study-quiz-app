module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard-scss', // configure for SCSS
    'stylelint-config-recommended-vue', // add overrides for .Vue files
    'stylelint-config-recess-order', // use the recess order for properties
    'stylelint-config-css-modules', // configure for CSS Modules methodology
    'stylelint-prettier/recommended', // lint lines with prettier
    'stylelint-config-prettier', // turn off any rules that conflict with Prettier
  ],
  rules: {
    'selector-class-pattern': null,

    // allow spesific unknown at rules, instead of enabling all unknown "at-rules" with "at-rule-no-unknown: null"
    'at-rule-no-unknown': [
      true,
      {
        // list of the all "at rules" using in scss
        ignoreAtRules: [
          'import',
          'media',
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'function',
          'return',
          'content',
          'use',
          'forward',
        ],
      },
    ],
  },

  defaultSeverity: 'warning', // shows warnings instead of errors
};
