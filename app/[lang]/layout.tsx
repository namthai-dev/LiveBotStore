import { stackServerApp } from '@/stack';

import Header from '@/components/header';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await stackServerApp.getUser({ or: 'redirect' });

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
