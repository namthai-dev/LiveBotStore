import { stackServerApp } from '@/stack';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Dashboard() {
  const user = await stackServerApp.getUser();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>

      <CardContent>
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
