import { useRouter } from '@tanstack/react-router';
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
  CircleCheck,
  Images,
  Package,
  Tags,
  X,
} from 'lucide-react';
import { useState } from 'react';

import ImageGallery from '@components/image-gallery';
import { Badge } from '@ui/badge';
import { Label } from '@ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Skeleton } from '@ui/skeleton';
import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import type { ProductType } from '../types';
import { cn } from '@/lib/utils';
import { useNavigate } from '@/i18n/routing';

type Props = {
  product: ProductType;
};
const ProductView: FC<Props> = ({
  product: {
    categories,
    description,
    images,
    is_active,
    name,
    price,
    variants,
  },
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentColor, setCurrentColor] = useState(variants[0].color);
  const totalStock = variants.reduce((sum, { stock }) => sum + stock, 0);
  const colorsMap = getDistinctColors({
    variants,
  });
  const colorsEntries = Array.from(colorsMap.entries());
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.history.back()}
            variant="outline"
            size="icon"
            className="rounded-full text-muted-foreground rtl:rotate-180"
          >
            <ArrowLeft />
          </Button>
          <h1 className="heading">{name}</h1>
          {is_active ? (
            <Badge variant="success">
              <CircleCheck />
              {t('Global.active')}
            </Badge>
          ) : (
            <Badge variant="destructive">
              <X />
              {t('Global.inactive')}
            </Badge>
          )}
        </div>
        <div className="flex flex-col">
          <strong className="heading">${price}</strong>
          <span className="text-sm text-muted-foreground">
            <b>{totalStock}</b> {t('ProductDetailsPage.itemsInStock')}
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
              {t('ProductDetailsPage.productImages')}
            </CardTitle>
            <RadioGroup
              onValueChange={setCurrentColor}
              defaultValue={currentColor}
            >
              <ul className="flex items-center gap-2">
                {Object.keys(images || {}).map((color, index) => (
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
              images={
                images?.[currentColor]?.map(
                  ({ urls: { original } }) => original
                ) || []
              }
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
                {t('ProductDetailsPage.description')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{description}</CardDescription>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Tags className="size-5 text-primary" />
                </div>
                {t('ProductDetailsPage.categories')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Badge variant="info-blue">{category.name}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Package className="size-5 text-primary" />
                </div>
                {t('ProductDetailsPage.inventoryByVariant')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorsEntries.map(([color, { sizes }]) => (
                <div className="flex flex-col gap-4 rounded-xl border bg-accent/40 px-4 py-2 md:flex-row">
                  <span className="font-medium text-nowrap capitalize">
                    {color}
                  </span>
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
                      <span className="text-muted-foreground">
                        {t('ProductDetailsPage.total')}:{' '}
                      </span>
                      <span className="font-medium">
                        {colorsMap.get(color)?.totalStock || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="ms-auto w-fit">
                <span className="font-medium">
                  {t('ProductDetailsPage.totalStocks')}:{' '}
                </span>
                <b>{totalStock}</b>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function getDistinctColors({
  variants,
}: {
  variants: ProductType['variants'];
}) {
  const colorsMap = new Map<
    string,
    {
      variantIds: Array<string>;
      sizes: Array<{
        size: string;
        stock: number;
      }>;
      totalStock: number;
    }
  >();

  variants.forEach(({ color, id, size, stock }) => {
    if (!colorsMap.has(color)) {
      colorsMap.set(color, {
        variantIds: [id],
        sizes: [{ size, stock }],
        totalStock: stock,
      });
    } else {
      colorsMap.get(color)?.variantIds.push(id);
      colorsMap.get(color)?.sizes.push({ size, stock });
      colorsMap.get(color)!.totalStock += stock;
    }
  });

  return colorsMap;
}

export const ProductViewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <CardHeader className="gap-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <Skeleton className="size-10 rounded-xl" />
              <Skeleton className="h-6 w-40" />
            </CardTitle>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-square w-full rounded-lg" />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-28" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </CardContent>
          </Card>
          <Card className="gap-4">
            <CardHeader className="gap-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 rounded-xl border bg-accent/40 px-4 py-2 md:flex-row">
                <Skeleton className="h-6 w-16" />
                <div className="flex w-full gap-2">
                  <span className="text-muted-foreground">=&gt;</span>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div className="ms-auto">
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border bg-accent/40 px-4 py-2 md:flex-row">
                <Skeleton className="h-6 w-16" />
                <div className="flex w-full gap-2">
                  <span className="text-muted-foreground">=&gt;</span>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div className="ms-auto">
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
              <div className="ms-auto w-fit">
                <Skeleton className="h-6 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const ProductNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <Package className="size-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">
            {t('ProductDetailsPage.productNotFound')}
          </CardTitle>
          <CardDescription>
            {t('ProductDetailsPage.productNotFoundDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button
            onClick={() =>
              navigate({
                to: '/products',
              })
            }
            variant="outline"
          >
            {t('ProductDetailsPage.viewProducts')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductView;
