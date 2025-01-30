import { Copy, Server } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cva, VariantProps } from 'class-variance-authority';

const apiItemVariants = cva('', {
  variants: {
    variant: {
      default: 'secondary',
      public: 'secondary',
      admin: 'destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ApiItemProps extends VariantProps<typeof apiItemVariants> {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

export default function ApiItem({
  title,
  description,
  variant = 'public',
}: ApiItemProps) {
  const { toast } = useToast();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast({ title: 'API Route copied to clipboard.', variant: 'default' });
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={apiItemVariants({ variant }) as BadgeProps['variant']}>
          {variant.toUpperCase()}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-2 py-1 font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
