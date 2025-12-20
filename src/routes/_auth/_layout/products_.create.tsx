import ProductDetailsForm from '@modules/products/components/product-details-form';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Input } from '@ui/input';
import { Plus, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Route = createFileRoute('/_auth/_layout/products_/create')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems.getState().setItems([
      { label: 'Products', href: '/products' },
      {
        label: 'Create',
        href: '/products/create',
        isCurrent: true,
      },
    ]);
    useSidebarItems.getState().setActiveItem('products');
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();
  return (
    <div className={cn('container space-y-6', { 'px-0': isMobile })}>
      <div className="flex items-center justify-between">
        <h1 className="heading">Create Product</h1>
        <Button>
          <Save /> Save Product
        </Button>
      </div>
      <ProductDetailsForm />
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 border-b pb-4">
            <p className="text-sm text-muted-foreground">Size</p>
            <ul>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <li key={size} className="mr-2 mb-2 inline-block">
                  <CustomCheckbox
                    key={size}
                    onChecked={(checked) => {
                      console.log(`${size} checked:`, checked);
                    }}
                  >
                    {size}
                  </CustomCheckbox>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="space-y-2 pt-4">
              <p className="text-sm text-muted-foreground">Colors</p>
              <div className="space-y-4">
                <div className="flex flex-col gap-4 rounded-md border bg-muted/30 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Blue, Red, etc..."
                      className="bg-background"
                    />
                    <Button
                      variant="destructive"
                      className="bg-destructive/15 text-destructive/90 hover:bg-destructive/20 dark:bg-destructive/15 dark:hover:bg-destructive/20"
                      size="icon-sm"
                    >
                      <X />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-dashed text-muted-foreground hover:bg-background/50"
                  >
                    <Upload />
                    Upload Image
                  </Button>
                </div>
                <div className="flex flex-col gap-4 rounded-md border bg-muted/30 p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Blue, Red, etc..."
                      className="bg-background"
                    />
                    <Button
                      variant="destructive"
                      className="bg-destructive/15 text-destructive/90 hover:bg-destructive/20 dark:bg-destructive/15 dark:hover:bg-destructive/20"
                      size="icon-sm"
                    >
                      <X />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-dashed text-muted-foreground hover:bg-background/50"
                  >
                    <Upload />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline" size="lg" className="w-full">
              <Plus /> Add More Colors
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const CustomCheckbox = ({
  children,
  onChecked,
  checked,
  defaultChecked,
}: {
  children: React.ReactNode;

  onChecked?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
}) => {
  const [value, setValue] = useState(checked || defaultChecked || false);
  return (
    <Button
      variant={value ? 'default' : 'secondary'}
      size="sm"
      className="rounded-md"
      asChild
    >
      <label>
        {children}

        <input
          type="checkbox"
          hidden
          checked={value}
          onChange={() => {
            setValue(!value);
            onChecked?.(!value);
          }}
        />
      </label>
    </Button>
  );
};
