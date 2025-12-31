import { cn, pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import { DataTable } from '@components/data-table';
import LocalizedText from '@components/localized-text';
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@modules/categories/mutations';
import { useCategoriesQuery } from '@modules/categories/queries';
import type { Category } from '@modules/categories/types';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import i18next from 'i18next';
import { Loader2, Pencil, Plus, RotateCcw, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/categories'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('categories');
  },
  head() {
    return { meta: [{ title: pageTitle('Categories') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const { data, isLoading, isFetching, refetch } = useCategoriesQuery();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = data?.data.data || [];
  useBreadcrumbSetup();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="heading">
            {t('CategoriesPage.categories')} ({categories.length})
          </h1>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RotateCcw
              className={cn({
                'animate-spin': isFetching,
              })}
            />
          </Button>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              {t('CategoriesPage.addCategory')}
            </Button>
          </DialogTrigger>
          <CategoryFormDialog
            onClose={() => setIsAddDialogOpen(false)}
            key={String(isAddDialogOpen)}
            mode="create"
          />
        </Dialog>
      </div>
      {isLoading ? (
        <Card>
          <CardContent>
            <Loader2
              className={cn('mx-auto h-6 w-6 text-primary', {
                'animate-spin': isLoading,
              })}
            />
          </CardContent>
        </Card>
      ) : (
        <DataTable
          className={cn('animation-duration-[0.7s]', {
            'animate-pulse': isFetching,
          })}
          columns={columns}
          data={categories}
        />
      )}
    </div>
  );
}

const columns: Array<ColumnDef<Category>> = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell({ row: { original } }) {
      return <span className="font-medium">#{original.id}</span>;
    },
  },
  {
    accessorKey: 'name',
    header: () => i18next.t('CategoriesPage.table.header.name'),
    cell({ row: { original } }) {
      return (
        <LocalizedText className="font-medium">{original.name}</LocalizedText>
      );
    },
  },
  {
    id: 'actions',
    header: () => i18next.t('CategoriesPage.table.header.actions'),
    cell: ({ row }) => {
      const ActionsCell = () => {
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
        const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
        const { mutate: deleteCategory, isPending } = useDeleteCategory(
          row.original.id
        );

        const handleDelete = () => {
          deleteCategory(undefined, {
            onSuccess() {
              setIsDeleteDialogOpen(false);
            },
          });
        };

        return (
          <div className="flex items-center gap-2">
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Pencil />
                  {i18next.t('Global.edit')}
                </Button>
              </DialogTrigger>
              <CategoryFormDialog
                onClose={() => setIsEditDialogOpen(false)}
                mode="edit"
                category={row.original}
                key={String(isEditDialogOpen)}
              />
            </Dialog>
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash />
                  {i18next.t('Global.delete')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {i18next.t('ProductsPage.deleteConfirmTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {i18next.t('ProductsPage.deleteConfirmDescription')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>
                    {i18next.t('Global.cancel')}
                  </AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending && <Loader2 className="animate-spin" />}
                    {i18next.t('Global.delete')}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      };

      return <ActionsCell />;
    },
  },
];

type CategoryFormDialogProps = {
  onClose: () => void;
  mode: 'create' | 'edit';
  category?: Category;
};

function CategoryFormDialog({
  onClose,
  mode,
  category,
}: CategoryFormDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(category?.name || '');
  const [error, setError] = useState<string | null>(null);
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory(
    category?.id || 0
  );

  const isPending = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (mode === 'create') {
      createCategory(name, {
        onSuccess() {
          onClose();
          setName('');
          setError(null);
        },
        onError() {
          setError(t('Global.alreadyExists'));
        },
      });
    } else if (category) {
      updateCategory(
        {
          name,
        },
        {
          onSuccess() {
            onClose();
            setError(null);
          },
          onError() {
            setError(t('Global.alreadyExists'));
          },
        }
      );
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {mode === 'create'
            ? t('CategoriesPage.addCategory')
            : t('CategoriesPage.editCategory')}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className={cn({
                'text-destructive': error,
              })}
            >
              {t('CategoriesPage.table.header.name')}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('CategoriesPage.table.header.name')}
              disabled={isPending}
              required
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            {t('Global.cancel')}
          </Button>
          <Button type="submit" disabled={isPending || !name.trim()}>
            {isPending && <Loader2 className="animate-spin" />}
            {mode === 'create' ? t('Global.create') : t('Global.update')}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([
      {
        label: t('CategoriesPage.categories'),
        href: '/categories',
        isCurrent: true,
      },
    ]);
  }, [setItems, t]);
}
