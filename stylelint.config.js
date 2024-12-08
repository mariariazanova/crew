import stylelintConfigStandard from 'stylelint-config-standard';
import stylelintScss from 'stylelint-scss';

/** @type {import('stylelint').Config} */
const config = {
  extends: [stylelintConfigStandard, stylelintScss],
  rules: {
    'at-rule-no-unknown': null,
    'import-notation':  ['string', { ignore: ['url'] }]
      // ['url', { ignore: ['local'] }]
    // 'scss/at-rule-no-unknown': true,
    // 'scss.lint.unknownAtRules': 'ignore',
    // 'block-no-empty': true,
    // 'color-no-invalid-hex': true,
    // 'declaration-colon-space-after': 'always',
    // 'max-empty-lines': 1,
    // 'no-duplicate-selectors': true,
    // 'indentation': 2,
    // 'scss/at-extend-no-missing-placeholder': true,
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/vendor/**'],
};

export default config;
