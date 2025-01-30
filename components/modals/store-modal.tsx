'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUser } from '@stackframe/stack';
import { useToast } from '@/hooks/use-toast';
import { useStoreModal } from '@/features/store/use-store-modal';

import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const user = useUser();
  const { toast } = useToast();

  const store = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await user?.createTeam({
        displayName: values.name,
      });
      toast({ title: 'New store created.', variant: 'default' });
      setTimeout(() => window.location.reload(), 3000);
    } catch {
      toast({ title: 'Something went wrong', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={store.isOpen}
      onClose={store.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-2 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="E-Commerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button
              disabled={loading}
              variant="outline"
              onClick={store.onClose}
            >
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
};
