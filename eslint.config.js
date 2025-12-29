import { tanstackConfig } from '@tanstack/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import i18next from 'eslint-plugin-i18next';

export default [
  ...tanstackConfig,
  ...pluginQuery.configs['flat/recommended'],
  i18next.configs['flat/recommended'],
  {
    ignores: [
      'eslint.config.js',
      'lint-staged.config.js',
      'commitlint.config.js',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'import/order': 'off',
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-only',
          'jsx-attributes': {
            includes: ['label', 'title'],
            exclude: [
              'className',
              'styleName',
              'options',
              'defaultValues',
              'side',
              'mode',
              'alt',
              'lang',
              'dataKey',
              'stackId',
              'nameKey',
              'stroke',
              'fill',
              'dir',
              'href',
              'onClick',
              'variant',
              'size',
              'color',
              'attribute',
              'role',
              'style',
              'type',
              'key',
              'id',
              'width',
              'height',
              'value',
              'onValueChange',
              'name',
              'defaultTheme',
              'locale',
              'defaultValue',
              'htmlFor',
              /^data-/,
              /^aria-/,
            ],
          },
        },
      ],
    },
  },
];
