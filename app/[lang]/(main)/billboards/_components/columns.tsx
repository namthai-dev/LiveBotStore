import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    cell: ({ row }) => {
      const imageUrl: string = row.getValue('imageUrl');
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-full items-center justify-center">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>View</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
