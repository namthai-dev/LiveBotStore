'use client';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';

import { useCategory } from '@/features/category/store';
import { getCategoriesByStoreIdWithBillboard } from '@/features/category/action';

import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Page() {
  const { onOpen } = useCategory();
  const user = useUser();

  const teamId = user?.selectedTeam?.id || '';

  const { data: categories } = useQuery({
    queryKey: ['categories', teamId],
    queryFn: async () => {
      return await getCategoriesByStoreIdWithBillboard(teamId);
    },
    enabled: !!teamId,
  });

  const handleAdd = () => {
    onOpen();
  };

  if (categories === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Categories (${categories?.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} entity="name" />
      <Heading title="API" description="API calls for categories" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </div>
  );
}
