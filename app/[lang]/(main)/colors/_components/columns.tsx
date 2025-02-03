import { ColumnDef } from '@tanstack/react-table';
import ColumnAction from './column-action';

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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    id: 'actions',
    size: 10,
    cell: ({ row }) => {
      const item = row.original;

      return <ColumnAction item={item} />;
    },
  },
];
