import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import useLocale from '@/hooks/use-locale';

type Props = Omit<
  React.ComponentProps<typeof Link>,
  'href' | 'locale' | 'preload' | 'children'
> & {
  children?: React.ReactNode | ((locale: string) => React.ReactNode);
};
const LanguageSwitcher: FC<Props> = ({ className, children, ...props }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const { searchStr } = useLocation();

  const targetLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <Link
      to={`${pathname}${searchStr}` as never}
      locale={targetLocale}
      preload={false}
      className={className}
      viewTransition
      {...props}
    >
      {typeof children === 'function'
        ? children(locale)
        : /* eslint-disable i18next/no-literal-string */
          children || `${locale === 'en' ? 'Ar' : 'En'}`}
    </Link>
  );
};

export default LanguageSwitcher;
