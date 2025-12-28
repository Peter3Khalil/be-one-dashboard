import { useMutation } from '@tanstack/react-query';
import { createProduct, uploadImages } from './services';

export function useCreateProduct() {
  return useMutation({
    mutationKey: ['createProduct'],
    mutationFn: createProduct,
  });
}

export function useUploadImages() {
  return useMutation({
    mutationKey: ['uploadImages'],
    mutationFn: uploadImages,
  });
}
