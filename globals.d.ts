import type { TranslationType } from '@/i18n/translation.type';
import type { TFunction } from 'i18next';

declare module 'i18next' {
  interface i18n {
    changeLanguage(
      lng?: 'ar' | 'en',
      callback?: Callback | undefined
    ): Promise<TFunction>;
  }

  interface CustomTypeOptions {
    defaultNS: 'ar';
    resources: {
      ar: TranslationType;
      en: TranslationType;
    };
  }
}
