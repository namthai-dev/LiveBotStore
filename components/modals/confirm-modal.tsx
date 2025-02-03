import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  asChild?: boolean;
  children?: React.ReactNode;
  onConfirm: () => void;
}
export default function ConfirmModal({
  isOpen,
  onClose,
  children,
  onConfirm,
  asChild = false,
}: ConfirmModalProps) {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    onConfirm();
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger
        onClick={e => {
          e.stopPropagation();
        }}
        asChild={asChild}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reverted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogHeader>
          <AlertDialogCancel
            onClick={e => {
              e.stopPropagation();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onClose && onClose();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
