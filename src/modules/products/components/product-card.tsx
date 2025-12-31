import { Link } from '@/i18n/routing';
import { cn, detectLang, formatPrice } from '@/lib/utils';
import { useDeleteProduct } from '@modules/products/mutations';
import type { ProductType as Product } from '@modules/products/types';
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
import { Card, CardContent, CardHeader } from '@ui/card';
import { Separator } from '@ui/separator';
import { CircleCheck, Eye, Loader2, Pencil, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteProduct, isPending } = useDeleteProduct(
    String(product.id)
  );

  const handleDelete = () => {
    deleteProduct(String(product.id), {
      onSuccess() {
        setIsOpen(false);
      },
    });
  };

  const colorKeys = Object.keys(product.images || {});
  const mainImage =
    colorKeys.length && product.images
      ? product.images[colorKeys[0]][0].urls.thumbnail
      : '';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Link
            to="/products/$id/view"
            params={{ id: String(product.id) }}
            className="relative size-16 shrink-0 overflow-hidden rounded-md"
          >
            <img
              src={mainImage}
              alt={product.name}
              className="absolute inset-0 size-full rounded-[inherit] object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1 space-y-1">
            <Link
              to="/products/$id/view"
              params={{ id: String(product.id) }}
              className={cn(
                'block truncate font-semibold underline-offset-2 duration-200 hover:text-primary hover:underline',
                {
                  arabic: detectLang(product.name) === 'ar',
                  english: detectLang(product.name) === 'en',
                }
              )}
            >
              {product.name}
            </Link>
            <p className="text-lg font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          {product.is_active ? (
            <Badge variant="success" className="shrink-0">
              <CircleCheck className="h-3 w-3" />
              {t('Global.active')}
            </Badge>
          ) : (
            <Badge variant="destructive" className="shrink-0">
              <X className="h-3 w-3" />
              {t('Global.inactive')}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Categories */}
        {product.categories.length > 0 && (
          <>
            <div className="flex flex-wrap gap-1">
              {product.categories.map((category) => (
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
            <Separator />
          </>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/products/$id/view" params={{ id: String(product.id) }}>
                <Eye className="h-4 w-4" />
                {t('Global.view')}
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/products/$id/edit" params={{ id: String(product.id) }}>
                <Pencil className="h-4 w-4" />
                {t('Global.edit')}
              </Link>
            </Button>
          </div>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full">
                <Trash className="h-4 w-4" />
                {t('Global.delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('ProductsPage.deleteConfirmTitle')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('ProductsPage.deleteConfirmDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  {t('Global.cancel')}
                </AlertDialogCancel>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending && <Loader2 className="animate-spin" />}
                  {t('Global.delete')}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
