'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@stackframe/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Modal } from '../modal';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useProduct } from '@/features/product/store';
import { createProduct, updateProduct } from '@/features/product/action';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MultiImageDropzone } from '../multi-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { ProductImage } from '@/features/product/type';
import { getCategoriesByStoreId } from '@/features/category/action';
import { getSizesByStoreId } from '@/features/size/action';
import { getColorsByStoreId } from '@/features/color/action';

export const FileStateSchema = z.object({
  id: z.string().optional(),
  file: z.union([z.instanceof(File), z.string()]),
  key: z.string(),
  progress: z.union([
    z.literal('PENDING'),
    z.literal('COMPLETE'),
    z.literal('ERROR'),
    z.number(),
  ]),
});

const formSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  images: z.array(FileStateSchema).optional(),
});

export default function ProductModal() {
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { edgestore } = useEdgeStore();

  const { isOpen, onClose, isEditing, data } = useProduct();

  const storeId = user?.selectedTeam?.id ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ['categories', storeId],
    queryFn: async () => await getCategoriesByStoreId(storeId),
    enabled: !!storeId,
  });

  const { data: sizes } = useQuery({
    queryKey: ['sizes', storeId],
    queryFn: async () => await getSizesByStoreId(storeId),
    enabled: !!storeId,
  });

  const { data: colors } = useQuery({
    queryKey: ['colors', storeId],
    queryFn: async () => await getColorsByStoreId(storeId),
    enabled: !!storeId,
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['products', storeId] });
    toast({
      title: isEditing ? 'Product edited' : 'New product created',
      variant: 'default',
    });
    setIsSubmitting(false);
    handleClose();
  };

  const onError = () => {
    toast({
      title: isEditing
        ? 'Failed to edit product'
        : 'Failed to create new product',
    });
    setIsSubmitting(false);
  };

  const { mutate: mutateCreate } = useMutation({
    mutationFn: createProduct,
    onSuccess,
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateProduct,
    onSuccess,
    onError,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      images: undefined,
    },
  });

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const images: ProductImage[] = [];
    if (values.images) {
      await Promise.all(
        values.images.map(async image => {
          const res = await edgestore.publicFiles.upload({
            file: image.file as File,
          });
          images.push({ url: res.url });
        }),
      );
    }
    mutateCreate({
      storeId,
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
      colorId: values.colorId,
      sizeId: values.sizeId,
      images: images,
    });
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const images: ProductImage[] = [];
    if (values.images) {
      await Promise.all(
        values.images.map(async image => {
          if (image.file instanceof File) {
            const res = await edgestore.publicFiles.upload({
              file: image.file as File,
              options: {
                replaceTargetUrl: data?.images?.find(i => i.id === image.id)
                  ?.url,
              },
            });
            images.push({ url: res.url, id: image.id });
          }
        }),
      );
    }
    mutateUpdate({
      id: data?.id ?? '',
      name: values.name,
      price: values.price,
      categoryId: values.categoryId,
      colorId: values.colorId,
      sizeId: values.sizeId,
      images: images,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (data) {
      form.setValue('name', data?.name || '');
      form.setValue('price', data?.price || 0);
      form.setValue('categoryId', data?.categoryId || '');
      form.setValue('colorId', data?.colorId || '');
      form.setValue('sizeId', data?.sizeId || '');
      form.setValue(
        'images',
        data?.images?.map(image => ({
          id: image.id,
          file: image.url,
          key: image.id ?? '',
          progress: 'COMPLETE',
        })),
      );
    }
  }, [data]);

  return (
    <Modal
      title={isEditing ? 'Edit a product' : 'Create new product'}
      description=""
      onClose={handleClose}
      isOpen={isOpen}
    >
      <Form {...form}>
        <form
          className="space-y-4 pb-4 pt-2"
          onSubmit={form.handleSubmit(isEditing ? handleUpdate : handleCreate)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    {...field}
                    value={field.value}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(item => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes?.map(item => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors?.map(item => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image upload</FormLabel>
                <FormControl>
                  <div>
                    <MultiImageDropzone
                      disabled={isSubmitting}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-2 pt-6">
            <Button
              type="button"
              disabled={isSubmitting}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
