import { LoginForm } from '@modules/auth/components/login-form';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useAuth } from './auth-provider';
import { Link } from '@/i18n/routing';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user } = useAuth();
  if (isLoading)
    return (
      <div className="flex h-svh flex-col items-center justify-center gap-2">
        <Loader2 className="animate-spin text-primary" size={45} />
        Loading...
      </div>
    );
  return user?.role === 'admin' ? (
    children
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
};

export default ProtectedRoute;
