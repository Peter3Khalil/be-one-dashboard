import { useLogout } from '@modules/auth/mutations';
import { getMe } from '@modules/auth/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext } from 'react';
import type { User } from '@modules/auth/types';

type ContextType = {
  user?: User;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  logout: () => void;
  refetch?: () => void;
};

const AuthContext = createContext<ContextType>({
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    throwOnError: false,
  });
  const { mutate } = useLogout();
  const logout = useCallback(() => {
    mutate();
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user: data?.data.data.user,
        isLoading,
        isSuccess,
        isError,
        logout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
