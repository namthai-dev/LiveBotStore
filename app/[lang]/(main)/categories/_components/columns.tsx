import { ColumnDef } from '@tanstack/react-table';

export type ColumnType = {
  name: string;
  id: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  billboardId: string;
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
    accessorKey: 'billboardId',
    header: 'Billboard Id',
  },
];
