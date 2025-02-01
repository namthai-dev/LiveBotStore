'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@stackframe/stack';
import { useEdgeStore } from '@/lib/edgestore';

import { useBillboard } from '@/features/billboard/store';
import { billboard } from '@/features/billboard/api';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Modal } from '../modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SingleImageDropzone } from '../single-image-dropzone';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.custom<File>(val => val instanceof File, 'A file is required'),
});

export default function BillboardModal() {
  const user = useUser();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isOpen, onClose } = useBillboard();
  const { edgestore } = useEdgeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync, status } = useMutation(billboard.mutation.create());

  const storeId = user?.selectedTeam?.id || '';
  const loading = status === 'pending' || isSubmitting;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: '',
      imageUrl: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const imageUrl = await handleUpload(values.imageUrl);
    if (!imageUrl) {
      toast({ title: 'Failed to upload image.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    mutateAsync({
      label: values.label,
      imageUrl: imageUrl,
      storeId: storeId,
    })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['billboards', storeId] });
        toast({ title: 'New billboard created.', variant: 'default' });
      })
      .catch(() => {
        toast({ title: 'Failed to create billboard.', variant: 'destructive' });
      })
      .finally(() => {
        setIsSubmitting(false);
        handleClose();
      });
  };

  const handleClose = () => {
    setIsSubmitting(false);
    form.reset();
    onClose();
  };

  const handleUpload = async (file: File | undefined) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      return res.url;
    }
  };

  return (
    <Modal
      title="Create new billboard"
      description=""
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 pb-4 pt-2"
        >
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
                <FormLabel>Image upload</FormLabel>
                <FormControl>
                  <SingleImageDropzone
                    height={100}
                    width={450}
                    value={field.value}
                    disabled={isSubmitting}
                    onChange={file => field.onChange(file)}
                  />
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
