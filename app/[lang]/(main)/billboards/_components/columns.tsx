import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import ColumnAction from '@/app/[lang]/(main)/billboards/_components/column-action';

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
    accessorKey: 'label',
    header: 'Label',
    cell(props) {
      return <div className="w-full truncate">{props.row.original.label}</div>;
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    size: 50,
    cell(props) {
      const imageUrl: string = props.row.getValue('imageUrl');
      return (
        <Image src={imageUrl} width={100} height={40} alt="preview-image" />
      );
    },
  },
  {
    id: 'actions',
    enableResizing: true,
    size: 10,
    cell: ({ row }) => {
      const item = row.original;

      return <ColumnAction item={item} />;
    },
  },
];
