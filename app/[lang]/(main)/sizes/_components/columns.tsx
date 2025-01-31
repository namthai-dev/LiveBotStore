import { ColumnDef } from '@tanstack/react-table';

export type ColumnType = {
  name: string;
  id: string;
  storeId: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
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
