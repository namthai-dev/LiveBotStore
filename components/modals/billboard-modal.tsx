'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@stackframe/stack';

import { useBillboard } from '@/features/billboard/store';
import { billboard } from '@/features/billboard/api';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Modal } from '../modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export default function BillboardModal() {
  const user = useUser();
  const { toast } = useToast();
  const { isOpen, onClose } = useBillboard();
  const { mutateAsync, status } = useMutation(billboard.mutation.create());

  const storeId = user?.selectedTeam?.id || '';
  const loading = status === 'pending';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutateAsync({
      label: values.label,
      imageUrl: values.imageUrl,
      storeId: storeId,
    })
      .then(() => {
        toast({ title: 'New billboard created.', variant: 'default' });
        onClose();
      })
      .catch(() => {
        toast({ title: 'Failed to create billboard.', variant: 'destructive' });
      });
  };

  return (
    <Modal
      title="Create new billboard"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-4 pt-2">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Label name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Url</FormLabel>
                <FormControl>
                  <Input placeholder="Image Url" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
