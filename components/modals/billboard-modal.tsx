'use client';

import { useBillboardModal } from '@/features/billboard/use-billboard-modal';
import { Modal } from '../modal';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export default function BillboardModal() {
  const billboard = useBillboardModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Modal
      title="Create new billbord"
      description=""
      isOpen={billboard.isOpen}
      onClose={billboard.onClose}
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
        </form>
      </Form>
    </Modal>
  );
}
