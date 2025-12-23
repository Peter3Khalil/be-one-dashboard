import products from '@assets/products.json';
import Combobox from '@components/combobox';
import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { MoreHorizontal, Plus, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';

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
export const Route = createFileRoute('/_auth/_layout/products')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Products', href: '/products', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Products') }] };
  },
});

function RouteComponent() {
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="heading">Products (15)</h1>
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
            Add Product
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Input placeholder="Search products..." className="w-80" />
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
              : 'Filter by Category'
          }
          searchPlaceholder="Search categories..."
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
    header: 'Name',
    cell({ row: { original } }) {
      return (
        <div className="flex items-center gap-2">
          <img
            src={original.thumbnail_url}
            alt={original.name}
            className="size-14 rounded-md object-cover"
          />
          <p>{original.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category_name',
    header: 'Category',
  },
  {
    id: 'actions',
    cell() {
      return (
        <Button variant="ghost" size="icon-sm" className="ms-auto flex">
          <MoreHorizontal />
        </Button>
      );
    },
  },
];
