import { redirect } from 'next/navigation';

import { stackServerApp } from '@/stack';
import { syncStore, getStoreByRefId } from '@/features/store/store-model';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await stackServerApp.getUser({ or: 'redirect' });
  const userStores = await stackServerApp.listTeams();

  if (userStores.length > 0) {
    userStores.forEach(async i => {
      const isExist = await getStoreByRefId(i.id);
      if (!isExist) {
        await syncStore(i.id);
      }
    });

    redirect(`/${userStores[0].id}`);
  }

  return <div>{children}</div>;
}
