'use client';

import { useUser } from '@stackframe/stack';

interface WithoutAuthProps {
  children: React.ReactNode;
}

export default function WithoutAuth({ children }: WithoutAuthProps) {
  const user = useUser();

  if (user) {
    return null;
  }

  return <>{children}</>;
}
