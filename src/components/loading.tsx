import { Loader2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { cn } from '@/lib/utils';

const Loading: FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        'flex h-svh flex-col items-center justify-center gap-2',
        className
      )}
      {...props}
    >
      <Loader2 className="animate-spin text-primary" size={45} />
      {t('Global.loading')}
    </div>
  );
};

export default Loading;
