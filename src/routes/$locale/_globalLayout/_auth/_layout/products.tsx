import products from '@assets/products.json';
import Combobox from '@components/combobox';
import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import {
  CircleCheck,
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  RotateCcw,
  Trash,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
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
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import type { ColumnDef } from '@tanstack/react-table';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';
import { Link } from '@/i18n/routing';

type Product = {
  id: number | string;
  name: string;
  price: number;
  description?: string;
  category_name: string;
  is_active?: boolean;
  image_url: string;
  thumbnail_url: string;
};
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
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  const { t } = useTranslation();
  const { setItems } = useBreadcrumbItems();
  useEffect(() => {
    setItems([
      { label: t('ProductsPage.products'), href: '/products', isCurrent: true },
    ]);
  }, [setItems, t]);
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
      <div className="flex items-center gap-4">
        <Input
          placeholder={t('ProductsPage.searchPlaceholder')}
          className="w-80"
        />
        <Combobox
          items={[
            {
              label: 'Summer',
              value: 'summer',
            },
            {
              label: 'Winter',
              value: 'winter',
            },
          ]}
          onSelect={setSelectedValues}
          label={
            selectedValues.length > 0
              ? `${selectedValues.length} ${selectedValues.length > 1 ? 'Categories' : 'Category'}`
              : t('ProductsPage.filterByCategory')
          }
          searchPlaceholder={t('ProductsPage.searchForCategoryPlaceholder')}
        />
      </div>
      <DataTable
        className={cn('animation-duration-[0.7s]', {
          'animate-pulse': false,
        })}
        columns={columns}
        data={products.data}
      />
      <CustomPagination
        className="mx-auto [&_ul]:gap-3"
        totalPages={products.pagination.count}
      />
    </div>
  );
}

const columns: Array<ColumnDef<Product>> = [
  {
    accessorKey: 'name',
    header: i18next.t('ProductsPage.table.header.name'),
    cell({ row: { original } }) {
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
              src={original.thumbnail_url}
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
    accessorKey: 'category_name',
    header: i18next.t('ProductsPage.table.header.category'),
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
