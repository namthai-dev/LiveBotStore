'use client';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';

import { useSize } from '@/features/size/store';
import { getSizesByStoreId } from '@/features/size/action';

import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Page() {
  const { onOpen } = useSize();
  const user = useUser();
  const teamId = user?.selectedTeam?.id || '';

  const { data: sizes } = useQuery({
    queryKey: ['sizes', teamId],
    queryFn: async () => {
      return await getSizesByStoreId(teamId);
    },
    enabled: !!teamId,
  });

  const handleAdd = () => {
    onOpen();
  };

  if (sizes === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Sizes (${sizes?.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={sizes} entity="name" />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </div>
  );
}
