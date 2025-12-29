import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, updateCategory } from './services';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createCategory'],
    mutationFn: createCategory,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateCategory', id],
    mutationFn: ({ name }: { name: string }) => updateCategory(id, name),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory(id: number | string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteCategory', id],
    mutationFn: () => deleteCategory(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
