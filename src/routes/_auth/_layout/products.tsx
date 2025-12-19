import Combobox from '@components/combobox';
import CustomPagination from '@components/custom-pagination';
import { DataTable } from '@components/data-table';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { MoreHorizontal, Plus, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, duplicateArray } from '@/lib/utils';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  variants: Array<{
    id: string;
    color: string;
    size: string;
    stock: number;
    image: string;
  }>;
};
export const Route = createFileRoute('/_auth/_layout/products')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems
      .getState()
      .setItems([{ label: 'Products', href: '/products', isCurrent: true }]);
    useSidebarItems.getState().setActiveItem('products');
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
        <Button>
          <Plus />
          Add Product
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
        data={duplicateArray(data)}
      />
      <CustomPagination className="mx-auto [&_ul]:gap-3" totalPages={5} />
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
            src={original.variants[0]?.image}
            alt={original.name}
            className="size-14 rounded-md object-cover"
          />
          <div>
            <h2 className="text-base font-medium">{original.name}</h2>
            <p className="text-xs text-muted-foreground">
              Size: {original.variants.map(({ size }) => size).join(', ')}
            </p>
            <p className="text-xs text-muted-foreground">
              Color: {original.variants.map(({ color }) => color).join(', ')}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'Stock',
    header: 'Stock',
    cell({ row: { original } }) {
      return (
        <span>
          {original.variants.reduce(
            (total, variant) => total + variant.stock,
            0
          )}
        </span>
      );
    },
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

const data: Array<Product> = [
  {
    id: '1',
    name: 'T-Shirt',
    price: 19.99,
    category: 'Winter',
    variants: [
      {
        id: 'v1',
        color: 'Red',
        size: 'M',
        stock: 10,
        image: 'https://shadcnuikit.com/images/products/01.jpeg',
      },
      {
        id: 'v2',
        color: 'Blue',
        size: 'L',
        stock: 5,
        image: 'https://shadcnuikit.com/images/products/01.jpeg',
      },
    ],
  },
  {
    id: '2',
    name: 'Jeans',
    price: 49.99,
    category: 'Summer',
    variants: [
      {
        id: 'v3',
        color: 'Black',
        size: 'M',
        stock: 8,
        image: 'https://shadcnuikit.com/images/products/01.jpeg',
      },
      {
        id: 'v4',
        color: 'Blue',
        size: '2XL',
        stock: 12,
        image: 'https://shadcnuikit.com/images/products/01.jpeg',
      },
    ],
  },
];
