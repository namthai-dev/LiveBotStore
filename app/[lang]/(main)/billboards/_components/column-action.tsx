import ConfirmModal from '../../../../../components/modals/confirm-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { Button } from '../../../../../components/ui/button';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@stackframe/stack';
import { useState } from 'react';
import { ColumnType } from './columns';
import { removeBillboard } from '@/features/billboard/action';
import { useBillboard } from '@/features/billboard/store';

interface ColumnActionProps {
  item: ColumnType;
}

export default function ColumnAction({ item }: ColumnActionProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { onEditing } = useBillboard();
  const user = useUser();

  const storeId = user?.selectedTeam?.id ?? '';

  const [isOpen, setIsOpen] = useState(false);

  const { mutate: mutateRemove } = useMutation({
    mutationFn: removeBillboard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards', storeId] });
      toast({ title: 'Billboard deleted.', variant: 'default' });
      handleClose();
    },
    onError: () => {
      toast({ title: 'Failed to delete billboard.', variant: 'destructive' });
    },
  });

  const handleRemove = () => {
    mutateRemove(item.id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <ConfirmModal
        onConfirm={handleRemove}
        isOpen={isOpen}
        onClose={handleClose}
      />
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
          <DropdownMenuItem onClick={() => onEditing(item)}>
            <Edit className="h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen}>
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
