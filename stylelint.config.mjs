export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    // 'stylelint-config-recommended-scss', // Add SCSS-specific rules
  ],
  overrides: [
    {
      files: ['**/*.vue'], // Target Vue files
      customSyntax: 'postcss-html', // Enable parsing of HTML inside Vue files
    },
  ],
  rules: {
    'import-notation': null,
    "media-feature-name-no-vendor-prefix": null,
    'at-rule-no-unknown': null, // Disable the default rule for unknown at-rules
    // 'scss/at-rule-no-unknown': true, // Enable the SCSS rule for at-rules
  },
}
