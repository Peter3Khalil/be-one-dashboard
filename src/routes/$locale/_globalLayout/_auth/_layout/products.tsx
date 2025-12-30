import { Link } from '@/i18n/routing';
import { cn, detectLang, formatPrice, pageTitle } from '@/lib/utils';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { useSidebarItems } from '@/stores/sidebar';
import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import {
  useProducts,
  withProductsProvider,
} from '@modules/products/components/products-provider';
import { useDeleteProduct } from '@modules/products/mutations';
import { useCategoriesQuery } from '@modules/products/queries';
import type { ProductType as Product } from '@modules/products/types';
import { Label } from '@radix-ui/react-label';
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
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card, CardContent } from '@ui/card';
import CustomCombobox from '@ui/custom-combobox';
import { Input } from '@ui/input';
import i18next from 'i18next';
import {
  CircleCheck,
  Eye,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Trash,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/products'
)({
  component: withProductsProvider(RouteComponent),
  onEnter() {
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Products') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const {
    dispatch,
    params,
    queryResult: { data, isLoading, isFetching, refetch },
  } = useProducts();

  const products = data?.data.data || [];
  const { data: categoriesData } = useCategoriesQuery();
  const categoryOptions = categoriesData?.data.data.map(({ name }) => ({
    label: name,
    value: name,
  }));
  useBreadcrumbSetup();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="heading">
            {t('ProductsPage.products')} ({data?.data.pagination.total_items})
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
        <Button asChild>
          <Link to="/products/create">
            <Plus />
            {t('ProductsPage.addProductButton')}
          </Link>
        </Button>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium">
            {t('CreateProductPage.productDetails.productName')}
          </Label>
          <Input
            type="search"
            placeholder={t('ProductsPage.searchPlaceholder')}
            className="w-80"
            value={params.product_name}
            onChange={(e) =>
              dispatch({ type: 'SET_PRODUCT_NAME', payload: e.target.value })
            }
          />
        </div>
        <CustomCombobox
          options={categoryOptions}
          label={t('ProductsPage.filterByCategory')}
          placeholder={t('CreateProductPage.selectCategory')}
          className="max-w-md"
          onValueChange={(v) =>
            dispatch({ type: 'SET_CATEGORY_NAME', payload: v })
          }
          noItemsFound={t('Global.noItemsFound')}
          defaultValues={params.category_name}
          multiple
        />
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
          data={products}
        />
      )}
      <CustomPagination
        className="mx-auto [&_ul]:gap-3"
        defaultPage={Number(params.offset || 0) + 1}
        key={params.offset}
        onValueChange={(page) =>
          dispatch({ type: 'SET_PAGE', payload: String(page - 1) })
        }
        totalPages={data?.data.pagination.total_pages || 1}
      />
    </div>
  );
}

const columns: Array<ColumnDef<Product>> = [
  {
    accessorKey: 'name',
    header: () => i18next.t('ProductsPage.table.header.name'),
    cell({ row: { original } }) {
      const colorKeys = Object.keys(original.images || {});
      const mainImage =
        colorKeys.length && original.images
          ? original.images[colorKeys[0]][0].urls.thumbnail
          : '';
      return (
        <div className="flex w-fit flex-row-reverse items-center gap-2">
          <Link
            to="/products/$id/view"
            params={{ id: String(original.id) }}
            className={cn(
              'peer font-medium underline-offset-2 duration-200 hover:text-primary hover:underline',
              {
                arabic: detectLang(original.name) === 'ar',
                english: detectLang(original.name) === 'en',
              }
            )}
          >
            {original.name}
          </Link>
          <Link
            to="/products/$id/view"
            className="relative size-14 overflow-hidden rounded-md peer-hover:*:scale-110"
            params={{ id: String(original.id) }}
          >
            <img
              src={mainImage}
              alt={original.name}
              className="absolute inset-0 size-full rounded-[inherit] object-cover duration-200 hover:scale-110"
            />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: () => i18next.t('ProductsPage.table.header.price'),
    cell: ({ row: { original } }) => {
      return <span>{formatPrice(original.price)}</span>;
    },
  },
  {
    accessorKey: 'categories',
    header: () => i18next.t('ProductsPage.table.header.category'),
    cell({ row: { original } }) {
      return (
        <div className="flex flex-wrap gap-1">
          {original.categories.map((category) => (
            <Badge
              key={category.id}
              variant="info-blue"
              className={cn({
                arabic: detectLang(category.name) === 'ar',
                english: detectLang(category.name) === 'en',
              })}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: () => i18next.t('ProductsPage.table.header.status'),
    cell({ row: { original } }) {
      return original.is_active ? (
        <Badge variant="success">
          <CircleCheck />
          {i18next.t('Global.active')}
        </Badge>
      ) : (
        <Badge variant="destructive">
          <X />
          {i18next.t('Global.inactive')}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ActionsCell = () => {
        const [isOpen, setIsOpen] = useState(false);
        const { mutate: deleteProduct, isPending } = useDeleteProduct(
          String(row.original.id)
        );

        const handleDelete = () => {
          deleteProduct(String(row.original.id), {
            onSuccess() {
              setIsOpen(false);
            },
          });
        };

        return (
          <div className="ms-auto flex w-fit items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link
                to="/products/$id/view"
                params={{ id: String(row.original.id) }}
              >
                <Eye />
                {i18next.t('Global.view')}
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link
                to="/products/$id/edit"
                params={{ id: String(row.original.id) }}
              >
                <Pencil />
                {i18next.t('Global.edit')}
              </Link>
            </Button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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

function useBreadcrumbSetup() {
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([
      { label: t('ProductsPage.products'), href: '/products', isCurrent: true },
    ]);
  }, [setItems, t]);
}
