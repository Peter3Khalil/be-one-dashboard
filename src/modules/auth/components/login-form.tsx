import InputFormField from '@components/form-fields/input-form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Form } from '@ui/form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useLogin } from '../mutations';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { t } = useTranslation();
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('LoginPage.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputFormField
                name="email"
                label={t('LoginPage.email')}
                placeholder={t('LoginPage.email')}
                type="email"
                control={form.control}
              />
              <InputFormField
                name="password"
                label={t('LoginPage.password')}
                placeholder={t('LoginPage.password')}
                type="password"
                control={form.control}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? t('Global.loading') : t('LoginPage.login')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
