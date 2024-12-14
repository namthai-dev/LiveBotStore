import { stackServerApp } from '@/stack';

import Header from '@/components/header';
import { Separator } from '@/components/ui/separator';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await stackServerApp.getUser({ or: 'redirect' });

  return (
    <div className='container mx-auto'>
      <Header />
      <Separator />
      {children}
    </div>
  );
}
