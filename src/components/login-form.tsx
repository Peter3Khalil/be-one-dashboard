import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Field, FieldGroup, FieldLabel } from '@ui/field';
import { Input } from '@ui/input';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('LoginPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('LoginPage.email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  {t('LoginPage.password')}
                </FieldLabel>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{t('LoginPage.login')}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
