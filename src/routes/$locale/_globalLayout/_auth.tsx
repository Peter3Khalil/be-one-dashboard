import { LoginForm } from '@components/login-form';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Link } from '@/i18n/routing';

export const Route = createFileRoute('/$locale/_globalLayout/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" lang="en" className="text-center text-4xl font-bold">
          Be One.
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
