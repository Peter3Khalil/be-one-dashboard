import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from './services';

export function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    },
  });
}
