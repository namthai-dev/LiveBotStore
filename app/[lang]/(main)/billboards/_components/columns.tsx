'use client';

import { ColumnDef } from '@tanstack/react-table';

export type ColumnType = {
  id: string;
  label: string;
  storeId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'label',
    header: 'Label',
  },
];
