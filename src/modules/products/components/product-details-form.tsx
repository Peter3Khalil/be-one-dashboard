import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Textarea } from '@ui/textarea';
import { Package2 } from 'lucide-react';

const ProductDetailsForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Package2 className="h-5 w-5 text-primary" />
          </div>
          Product Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="text-sm text-muted-foreground">
              Product Name
            </Label>
            <Input id="name" placeholder="Product Name" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="price" className="text-sm text-muted-foreground">
              Price
            </Label>
            <Input id="price" placeholder="Price" type="number" min={1} />
          </div>
          <div className="col-span-full flex flex-col gap-1">
            <Label
              htmlFor="description"
              className="text-sm text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Description"
              className="min-h-32"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductDetailsForm;
