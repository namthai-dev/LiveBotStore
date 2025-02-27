'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@stackframe/stack';
import { useEdgeStore } from '@/lib/edgestore';

import { useBillboard } from '@/features/billboard/store';
import { createBillboard, updateBillboard } from '@/features/billboard/action';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Modal } from '../modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SingleImageDropzone } from '../single-image-dropzone';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.union([
    z.custom<File>(val => val instanceof File, 'A file is required'),
    z.string().url(),
  ]),
});

export default function BillboardModal() {
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { edgestore } = useEdgeStore();
  const { isOpen, isEditing, onClose, data } = useBillboard();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const storeId = user?.selectedTeam?.id || '';

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['billboards', storeId] });
    toast({
      title: isEditing ? 'Billboard edited' : 'New billboard created.',
      variant: 'default',
    });
    setIsSubmitting(false);
    handleClose();
  };

  const onError = () => {
    toast({
      title: isEditing
        ? 'Failed to edit billboard'
        : 'Failed to create billboard.',
      variant: 'destructive',
    });
    setIsSubmitting(false);
  };

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateBillboard,
    onSuccess: onSuccess,
    onError: onError,
  });

  const { mutate: mutateCreate } = useMutation({
    mutationFn: createBillboard,
    onSuccess: onSuccess,
    onError: onError,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: data?.label ?? '',
      imageUrl: data?.imageUrl ?? undefined,
    },
  });

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const imageUrl = await handleUpload(values.imageUrl as File);
    if (!imageUrl) {
      toast({ title: 'Failed to upload image.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    mutateCreate({
      label: values.label,
      imageUrl: imageUrl,
      storeId: storeId,
    });
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    let imageUrl;

    if (values.imageUrl instanceof File) {
      imageUrl = await handleReplace(values.imageUrl);
      if (!imageUrl) {
        toast({ title: 'Failed to replace image.', variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }
    }

    mutateUpdate({
      label: values.label,
      imageUrl: imageUrl,
      id: data?.id ?? '',
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const handleUpload = async (file: File | undefined) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      return res.url;
    }
  };

  const handleReplace = async (file: File | undefined) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: data?.imageUrl,
        },
      });
      return res.url;
    }
  };

  useEffect(() => {
    form.setValue('label', data?.label ?? '');
    form.setValue('imageUrl', data?.imageUrl ?? '');
  }, [data]);

  return (
    <Modal
      title={isEditing ? 'Edit your billboard' : 'Create new billboard'}
      description=""
      isOpen={isOpen}
      onClose={handleClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(isEditing ? handleUpdate : handleCreate)}
          className="space-y-4 pb-4 pt-2"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="News" {...field} value={field.value} />
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
                    onChange={field.onChange}
                  />
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
