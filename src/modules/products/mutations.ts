import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createProduct,
  deleteImage,
  updateProductDetails,
  uploadImages,
} from './services';

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

export function useDeleteImage() {
  return useMutation({
    mutationKey: ['deleteImage'],
    mutationFn: deleteImage,
  });
}
export function useDeleteImages() {
  const [isPending, setIsPending] = useState(false);
  const { mutate } = useDeleteImage();
  return {
    isPending,
    deleteImages: (imageIds: Array<string>) => {
      setIsPending(true);
      Promise.all(imageIds.map((id) => mutate(id))).finally(() =>
        setIsPending(false)
      );
    },
  };
}

export function useUpdateProductDetails(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateProductDetails', productId],
    mutationFn: (data: Parameters<typeof updateProductDetails>[0]['data']) =>
      updateProductDetails({ productId, data }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
}
