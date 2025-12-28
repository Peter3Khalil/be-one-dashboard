import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function duplicateArray<T>(arr: Array<T>, times = 5): Array<T> {
  let result: Array<T> = [];
  for (let i = 0; i < times; i++) {
    result = result.concat(arr);
  }
  return result;
}

export function pageTitle(title: string) {
  return `${capitalize(title)} - Be One`;
}

export function capitalize(str: string) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createQueryString(
  params: Record<string, Array<unknown> | string | number>
) {
  let s = '';
  Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => (s += `${key}=${v}&`));
    } else {
      if (typeof value === 'string' || typeof value === 'number')
        s += `${key}=${value}&`;
      else s += `${key}=${JSON.stringify(value)}&`;
    }
  });
  return s.endsWith('&') ? s.slice(0, -1) : s;
}
