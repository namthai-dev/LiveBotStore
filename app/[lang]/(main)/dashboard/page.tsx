'use client';
import { useUser } from '@stackframe/stack';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const user = useUser();

  return (
    <div className="h-full w-full space-y-10 pt-10">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="font-semibold">Head up!</AlertTitle>
        <AlertDescription>
          <p className="font-semibold">
            After uploading your own products, you need to use the store ID
            below to host website for your customer
          </p>
          <span className="font-semibold">Store ID:</span>{' '}
          <code className="font-bold">{user?.selectedTeam?.id}</code>
        </AlertDescription>
      </Alert>
      <Image
        src="/work-in-progress.svg"
        alt="wip"
        width={400}
        height={400}
        className="mx-auto"
      />
    </div>
  );
}
