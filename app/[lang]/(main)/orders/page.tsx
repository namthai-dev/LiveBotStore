'use client';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';

import { useOrder } from '@/features/order/store';
import { getOrdersByStoreId } from '@/features/order/action';

import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Page() {
  const { onOpen } = useOrder();
  const user = useUser();
  const teamId = user?.selectedTeam?.id || '';

  const { data: orders } = useQuery({
    queryKey: ['orders', teamId],
    queryFn: async () => {
      return await getOrdersByStoreId(teamId);
    },
    enabled: !!teamId,
  });

  const handleAdd = () => {
    onOpen();
  };

  if (orders === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Orders (${orders?.length})`}
          description="Manage orders for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={orders} entity="phone" />
      <Heading title="API" description="API calls for orders" />
      <Separator />
      <ApiList entityIdName="orderId" entityName="orders" />
    </div>
  );
}
