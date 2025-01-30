'use client';

import { useUser } from '@stackframe/stack';

interface WithAuthProps {
  children: React.ReactNode;
}

export default function WithAuth({ children }: WithAuthProps) {
  const user = useUser();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
