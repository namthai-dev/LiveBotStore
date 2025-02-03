'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@stackframe/stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Modal } from '../modal';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useColor } from '@/features/color/store';
import { createColor, updateColor } from '@/features/color/action';

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export default function ColorModal() {
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onClose, isEditing, data } = useColor();

  const storeId = user?.selectedTeam?.id ?? '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['colors', storeId] });
    toast({
      title: isEditing ? 'Color edited' : 'New color created',
      variant: 'default',
    });
    setIsSubmitting(false);
    handleClose();
  };

  const onError = () => {
    toast({
      title: isEditing ? 'Failed to edit color' : 'Failed to create new color',
    });
    setIsSubmitting(false);
  };
  const { mutate: mutateCreate } = useMutation({
    mutationFn: createColor,
    onSuccess,
    onError,
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateColor,
    onSuccess,
    onError,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      value: '',
    },
  });

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    mutateCreate({
      storeId,
      value: values.value,
      name: values.name,
    });
  };

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    mutateUpdate({
      id: data?.id ?? '',
      name: values.name,
      value: values.value,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.setValue('name', data?.name || '');
    form.setValue('value', data?.value || '');
  }, [data]);

  return (
    <Modal
      title={isEditing ? 'Edit a color' : 'Create new color'}
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input placeholder="Value" {...field} value={field.value} />
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
