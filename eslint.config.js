//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  ...tanstackConfig,
  ...pluginQuery.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
