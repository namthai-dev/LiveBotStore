'use client';
import { useUser } from '@stackframe/stack';
import { useQuery } from '@tanstack/react-query';

import { useProduct } from '@/features/product/store';
import { getProductsByStoreId } from '@/features/product/action';

import { columns } from './_components/columns';
import ApiList from '@/components/api-list';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';

export default function Page() {
  const { onOpen } = useProduct();
  const user = useUser();
  const teamId = user?.selectedTeam?.id || '';

  const { data: products } = useQuery({
    queryKey: ['products', teamId],
    queryFn: async () => {
      return await getProductsByStoreId(teamId);
    },
    enabled: !!teamId,
  });

  const handleAdd = () => {
    onOpen();
  };

  if (products === undefined) {
    return null;
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between">
        <Heading
          title={`Products (${products?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={handleAdd}>
          <Plus /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={products} entity="name" />
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </div>
  );
}
