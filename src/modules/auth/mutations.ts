import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from './services';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    },
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
