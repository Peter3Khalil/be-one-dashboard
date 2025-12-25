import type { LoginResponse } from './types';
import axiosClient from '@/lib/axios-client';

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return axiosClient.post<LoginResponse>('/auth/login', { email, password });
}
