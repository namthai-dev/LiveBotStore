'use client';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';

import { color } from '@/features/color/api';
import { useColor } from '@/features/color/store';

import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Page() {
  const { onOpen } = useColor();
  const user = useUser();
  const teamId = user?.selectedTeam?.id || '';

  const { data: colors } = useQuery(color.query.getStoreByRefId(teamId));

  const handleAdd = () => {
    onOpen();
  };

  if (colors === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Colors (${colors?.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={colors} />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityIdName="color" entityName="colors" />
    </div>
  );
}
