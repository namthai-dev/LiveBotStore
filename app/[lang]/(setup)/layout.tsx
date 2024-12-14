import { redirect } from 'next/navigation';

import { stackServerApp } from '@/stack';
import { syncStore, getStoreByRefId } from '@/features/store/store-model';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  const stores = await user.listTeams();

  if (stores.length > 0) {
    stores.forEach(async i => {
      const isExist = await getStoreByRefId(i.id);
      if (!isExist) {
        await syncStore(i.id);
      }
    });
    user.setSelectedTeam(stores[0]);
    redirect('/store');
  }

  return <div>{children}</div>;
}
