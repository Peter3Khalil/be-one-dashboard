import productDetails from '@assets/product-details.json';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Button, buttonVariants } from '@ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/card';
import {
  ArrowLeft,
  Book,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Images,
  Package,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Badge } from '@ui/badge';
import { useSidebarItems } from '@/stores/sidebar';
import { useBreadcrumbItems } from '@/stores/breadcrumb';
import { cn, pageTitle } from '@/lib/utils';

export const Route = createFileRoute('/_auth/_layout/products_/$id')({
  component: RouteComponent,
  onEnter() {
    useBreadcrumbItems.getState().setItems([
      { label: 'Products', href: '/products' },
      {
        label: 'Product Details',
        isCurrent: true,
      },
    ]);
    useSidebarItems.getState().setActiveItem('products');
  },
  head() {
    return { meta: [{ title: pageTitle('Product Details') }] };
  },
});

function RouteComponent() {
  const router = useRouter();
  const colorsMap = getDistinctColors({
    variants: productDetails.data.variants,
    images: productDetails.data.images,
  });
  const [currentColor, setCurrentColor] = useState(
    productDetails.data.variants[0].color
  );
  const totalStock = productDetails.data.variants.reduce(
    (sum, { stock }) => sum + stock,
    0
  );

  const colorsEntries = Array.from(colorsMap.entries());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.history.back()}
            variant="outline"
            size="icon"
            className="rounded-full text-muted-foreground"
          >
            <ArrowLeft />
          </Button>
          <h1 className="heading">{productDetails.data.name}</h1>
          {productDetails.data.is_active ? (
            <Badge variant="success">
              <CircleCheck />
              Active
            </Badge>
          ) : (
            <Badge variant="destructive">
              <X />
              Inactive
            </Badge>
          )}
        </div>
        <div className="flex flex-col">
          <strong className="heading">${productDetails.data.price}</strong>
          <span className="text-sm text-muted-foreground">
            <b>{totalStock}</b> items in stock
          </span>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <CardHeader className="gap-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Images className="size-5 text-primary" />
              </div>
              Product Images
            </CardTitle>
            <RadioGroup
              onValueChange={setCurrentColor}
              defaultValue={currentColor}
            >
              <ul className="flex items-center gap-2">
                {Array.from(colorsMap.keys()).map((color, index) => (
                  <li key={color} className="flex">
                    <RadioGroupItem value={color} hidden id={String(index)}>
                      {color}
                    </RadioGroupItem>
                    <Label
                      className={buttonVariants({
                        variant:
                          currentColor === color ? 'default' : 'secondary',
                        size: 'sm',
                      })}
                      htmlFor={String(index)}
                    >
                      {color}
                    </Label>
                  </li>
                ))}
              </ul>
            </RadioGroup>
          </CardHeader>
          <CardContent>
            <ImageGallery
              key={currentColor}
              images={colorsMap.get(currentColor)?.images || []}
            />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Book className="size-5 text-primary" />
                </div>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {productDetails.data.description}
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Package className="size-5 text-primary" />
                </div>
                Inventory by Variant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorsEntries.map(([color, { sizes }]) => (
                <div className="flex flex-col gap-4 rounded-xl border bg-accent/40 px-4 py-2 md:flex-row">
                  <span className="font-medium capitalize">{color}</span>
                  <div className="flex w-full gap-2">
                    <span className="text-muted-foreground">=&gt;</span>
                    <ul className="flex items-center gap-4">
                      {sizes.map(({ size, stock }) => (
                        <li>
                          <span className="text-sm text-muted-foreground capitalize">
                            {size}:{' '}
                          </span>
                          <span
                            className={cn('font-medium', {
                              'text-green-500': stock > 20,
                              'text-destructive': stock === 0,
                              'text-amber-500': stock > 0 && stock <= 20,
                            })}
                          >
                            {stock}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="ms-auto">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-medium">
                        {colorsMap.get(color)?.totalStock || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="ms-auto w-fit">
                <span className="font-medium">Total Stocks: </span>
                <b>{totalStock}</b>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getDistinctColors({
  variants,
  images = [],
}: {
  variants: typeof productDetails.data.variants;
  images?: typeof productDetails.data.images;
}) {
  const colorsMap = new Map<
    string,
    {
      variantIds: Array<number>;
      sizes: Array<{
        size: string;
        stock: number;
      }>;
      images: Array<string>;
      totalStock: number;
    }
  >();

  variants.forEach(({ color, id, size, stock }) => {
    if (!colorsMap.has(color)) {
      colorsMap.set(color, {
        variantIds: [id],
        images: [],
        sizes: [{ size, stock }],
        totalStock: stock,
      });
    } else {
      colorsMap.get(color)?.variantIds.push(id);
      colorsMap.get(color)?.sizes.push({ size, stock });
      colorsMap.get(color)!.totalStock += stock;
    }
  });

  images.forEach(({ variant_id, urls }) => {
    colorsMap.forEach((value) => {
      if (value.variantIds.includes(variant_id)) {
        value.images.push(urls.original);
      }
    });
  });

  return colorsMap;
}

const ImageGallery = ({ images }: { images: Array<string> }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
        <Package className="h-12 w-12 text-muted-foreground" />
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-3">
      <div className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={currentImage}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute start-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background/90"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background/90"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 transition-colors ${
                index === currentIndex
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/50'
              }`}
            >
              <img src={img} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
