import { redirect } from 'next/navigation';

import { stackServerApp } from '@/stack';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await stackServerApp.getUser({ or: 'redirect' });
  const userStores = await stackServerApp.listTeams();

  if (userStores.length > 0) {
    redirect(`/${userStores[0].id}`);
  }

  return <div>{children}</div>;
}
