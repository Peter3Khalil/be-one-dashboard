import axiosClient from '@/lib/axios-client';
import type { StatisticsResponse } from './types';

export function getStats() {
  return axiosClient.get<StatisticsResponse>('/statistics');
}
