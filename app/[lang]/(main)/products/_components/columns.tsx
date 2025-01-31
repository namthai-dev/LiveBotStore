import { Decimal } from '@prisma/client/runtime/library';
import { ColumnDef } from '@tanstack/react-table';

export type ColumnType = {
  name: string;
  id: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  sizeId: string;
  categoryId: string;
  colorId: string;
  price: Decimal;
  isFeatured: boolean;
  isArchived: boolean;
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'isArchived',
    header: 'isArchived',
  },
];
