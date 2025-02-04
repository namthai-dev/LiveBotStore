import { ColumnDef } from '@tanstack/react-table';
import ColumnAction from './column-action';
import Image from 'next/image';
import { ProductImage } from '@/features/product/type';

export type ColumnType = {
  name: string;
  id: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
  sizeId: string;
  categoryId: string;
  colorId: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  images: { url: string; id?: string }[];
  category: { name: string };
  color: { name: string };
  size: { name: string };
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell(props) {
      const item = props.row.original.category.name;
      return <div>{item}</div>;
    },
  },
  {
    accessorKey: 'sizeId',
    header: 'Size',
    cell(props) {
      const item = props.row.original.size.name;
      return <div>{item}</div>;
    },
  },
  {
    accessorKey: 'colorId',
    header: 'Color',
    cell(props) {
      const item = props.row.original.color.name;
      return <div>{item}</div>;
    },
  },
  {
    accessorKey: 'isFeatured',
    header: 'isFeatured',
  },
  {
    accessorKey: 'isArchived',
    header: 'isArchived',
  },
  {
    accessorKey: 'images',
    header: 'Images',
    cell(props) {
      const items: ProductImage[] = props.row.original.images;
      return (
        <div className="flex flex-col space-y-2">
          {items.map(i => (
            <Image
              key={i.url}
              src={i.url}
              width={100}
              height={50}
              alt="image"
            />
          ))}
        </div>
      );
    },
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
