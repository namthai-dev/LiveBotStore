'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUser } from '@stackframe/stack';
import { Terminal } from 'lucide-react';

export default function Settings() {
  const user = useUser();
  return (
    <div className="pt-20">
      <Alert variant="default">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Head up!</AlertTitle>
        <AlertDescription>
          <p>
            After uploading your own products, you need to use the store ID
            below to host website for your customer
          </p>
          <span>Store ID:</span>{' '}
          <code className="font-bold">{user?.selectedTeam?.id}</code>
          <p>
            Please provide your store id to this email address:
            nam.thai.vi@outlook.com
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
