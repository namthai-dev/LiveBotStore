import { ColumnDef } from '@tanstack/react-table';

export type ColumnType = {
  id: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  value: string;
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
    accessorKey: 'value',
    header: 'Value',
  },
];
