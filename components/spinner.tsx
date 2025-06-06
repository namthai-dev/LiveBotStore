import { cva, type VariantProps } from 'class-variance-authority';

import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export default function Spinner({ size, className }: SpinnerProps) {
  return <Loader className={cn(spinnerVariants({ size }), className)} />;
}
