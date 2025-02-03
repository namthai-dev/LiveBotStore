import { ColumnDef } from '@tanstack/react-table';
import ColumnAction from './column-action';

export type ColumnType = {
  name: string;
  id: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  billboardId: string;
  billboard: {
    label: string;
  };
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell(props) {
      return <div className="w-full truncate">{props.row.original.name}</div>;
    },
  },
  {
    accessorKey: 'billboardId',
    header: 'Billboard',
    size: 50,
    cell(props) {
      return (
        <div className="w-fit truncate rounded-lg bg-secondary px-2 py-1">
          {props.row.original.billboard.label}
        </div>
      );
    },
  },
  {
    id: 'actions',
    size: 10,
    cell(props) {
      const item = props.row.original;
      return <ColumnAction item={item} />;
    },
  },
];
