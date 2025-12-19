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
