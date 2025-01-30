'use client';
import { useQuery } from '@tanstack/react-query';
import { billboard } from '@/features/billboard/api';
import { useUser } from '@stackframe/stack';

import { Plus } from 'lucide-react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/data-table';
import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { useBillboardModal } from '@/features/billboard/use-billboard-modal';

export default function Page() {
  const user = useUser();
  const { onOpen } = useBillboardModal();
  const teamId = user?.selectedTeam?.id || '';

  const { data: billboards } = useQuery(
    billboard.query.getStoreByRefId(teamId),
  );

  const handleAdd = () => {
    onOpen();
  };
  if (billboards === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Billboards (${billboards?.length})`}
          description="Mange billboards for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} />
      <Heading title="API" description="API calls for billboards" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </div>
  );
}
