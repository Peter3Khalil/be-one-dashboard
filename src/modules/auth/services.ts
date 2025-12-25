import type { GetMeResponse, LoginResponse } from './types';
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

export function getMe() {
  return axiosClient.get<GetMeResponse>('/user/me');
}

export function logout() {
  return axiosClient.post<{
    statusCode: boolean;
    message: string;
  }>('/auth/logout');
}
