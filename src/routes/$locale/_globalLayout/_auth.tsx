import { AuthProvider } from '@components/auth-provider';
import ProtectedRoute from '@components/protected-route';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/_globalLayout/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </AuthProvider>
  );
}
