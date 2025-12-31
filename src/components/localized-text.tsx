import { cn, detectLang } from '@/lib/utils';
import type { FC } from 'react';

type Props = {
  children?: string;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;
const LocalizedText: FC<Props> = ({ children = '' }) => {
  return (
    <span
      className={cn({
        arabic: detectLang(children) === 'ar',
        english: detectLang(children) === 'en',
      })}
    >
      {children}
    </span>
  );
};

export default LocalizedText;
