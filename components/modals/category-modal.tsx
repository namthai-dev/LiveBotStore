'use client';

import { createCategory, updateCategory } from '@/features/category/action';
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
import { useCategory } from '@/features/category/store';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getBillboardsByStoreId } from '@/features/billboard/action';

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export default function CategoryModal() {
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onClose, isEditing, data } = useCategory();

  const storeId = user?.selectedTeam?.id ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['categories', storeId] });
    toast({
      title: isEditing ? 'Category edited' : 'New category created',
      variant: 'default',
    });
    setIsSubmitting(false);
    handleClose();
  };

  const onError = () => {
    toast({
      title: isEditing
        ? 'Failed to edit category'
        : 'Failed to create new category',
    });
    setIsSubmitting(false);
  };
  const { mutate: mutateCreate } = useMutation({
    mutationFn: createCategory,
    onSuccess,
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateCategory,
    onSuccess,
    onError,
  });

  const { data: billboards } = useQuery({
    queryKey: ['billboards', storeId],
    queryFn: async () => {
      return await getBillboardsByStoreId(storeId);
    },
    enabled: !!storeId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      billboardId: '',
    },
  });

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    mutateCreate({
      storeId,
      billboardId: values.billboardId,
      name: values.name,
    });
  };

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    mutateUpdate({
      id: data?.id ?? '',
      name: values.name,
      billboardId: values.billboardId,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.setValue('name', data?.name || '');
    form.setValue('billboardId', data?.billboardId || '');
  }, [data]);

  return (
    <Modal
      title={isEditing ? 'Edit a category' : 'Create new category'}
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
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a billboard" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboards?.map(billboard => (
                      <SelectItem value={billboard.id} key={billboard.id}>
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
