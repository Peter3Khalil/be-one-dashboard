import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import {
  useCategoriesQuery,
  useProductsQuery,
} from '@modules/products/queries';
import { Label } from '@radix-ui/react-label';
import { createFileRoute } from '@tanstack/react-router';
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
import CustomCombobox from '@ui/custom-combobox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import i18next from 'i18next';
import {
  CircleCheck,
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  RotateCcw,
  Trash,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@ui/card';
import type { ProductType as Product } from '@modules/products/types';
import type { ColumnDef } from '@tanstack/react-table';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import useDebounce from '@/hooks/use-debounce';

export const Route = createFileRoute(
  '/$locale/_globalLayout/_auth/_layout/products'
)({
  component: RouteComponent,
  onEnter() {
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Products') }] };
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const [productName, setProductName] = useState('');
  const debouncedProductName = useDebounce(productName);
  const [categoryName, setCategoryName] = useState('');
  const { data, isFetching, isLoading } = useProductsQuery({
    product_name: debouncedProductName,
    category_name: categoryName,
  });
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
          <h1 className="heading">{t('ProductsPage.products')} (15)</h1>
          <Button variant="ghost" size="icon-sm">
            <RotateCcw
              className={cn({
                'animate-spin': false,
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <CustomCombobox
          options={categoryOptions}
          label={t('ProductsPage.filterByCategory')}
          placeholder={t('CreateProductPage.selectCategory')}
          className="max-w-md"
          onValueChange={(v) => setCategoryName(v[0])}
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
        totalPages={data?.data.pagination.total_pages || 1}
      />
    </div>
  );
}

const columns: Array<ColumnDef<Product>> = [
  {
    accessorKey: 'name',
    header: i18next.t('ProductsPage.table.header.name'),
    cell({ row: { original } }) {
      const colorKeys = Object.keys(original.images);
      const mainImage = colorKeys.length
        ? original.images[colorKeys[0]][0].urls.thumbnail
        : '';
      return (
        <div className="flex w-fit flex-row-reverse items-center gap-2">
          <Link
            to="/products/$id/view"
            params={{ id: String(original.id) }}
            className="peer font-medium underline-offset-2 duration-200 hover:text-primary hover:underline"
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
    header: i18next.t('ProductsPage.table.header.price'),
  },
  {
    accessorKey: 'categories',
    header: i18next.t('ProductsPage.table.header.category'),
    cell({ row: { original } }) {
      return (
        <div className="flex flex-wrap gap-1">
          {original.categories.map((category) => (
            <Badge key={category.id} variant="info-blue">
              {category.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: i18next.t('ProductsPage.table.header.status'),
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
      const Component = () => {
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/products/$id/view"
                    viewTransition
                    params={{ id: String(row.original.id) }}
                  >
                    <Eye />
                    {i18next.t('Global.view')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild variant="info">
                  <Link
                    to="/products/$id/edit"
                    params={{ id: String(row.original.id) }}
                    viewTransition
                  >
                    <Pencil />
                    {i18next.t('Global.edit')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem variant="destructive">
                    <Trash />
                    {i18next.t('Global.delete')}
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive">Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      };

      return <Component />;
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
