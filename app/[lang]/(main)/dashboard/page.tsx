'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@stackframe/stack';
import WithAuth from '@/hocs/with-auth';
import WithoutAuth from '@/hocs/without-auth';

export default function Dashboard() {
  const user = useUser();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <WithAuth>
          <span>Authenticated</span>
        </WithAuth>
        <WithoutAuth>
          <span>Unauthenticated</span>
        </WithoutAuth>
        {user ? (
          <ul>
            <li>Name: {user.displayName}</li>
            <li>Email: {user.primaryEmail}</li>
          </ul>
        ) : (
          <p>User not found.</p>
        )}
      </CardContent>
    </Card>
  );
}
