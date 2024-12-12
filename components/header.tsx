import React, { Suspense } from 'react';
import Link from 'next/link';

import { UserButton } from '@stackframe/stack';

import ThemeSwitcher from './theme-switcher';
import StoreSwitcher from './store-switcher';

export default function Header() {
  return (
    <header className="border-b px-8 py-4">
      <div className="flex justify-between">
        <ul className="flex items-center gap-4">
          <StoreSwitcher />
          <Link href="/">Overview</Link>
          <Link href="/product">Products</Link>
          <Link href="/prder">Orders</Link>
        </ul>
        <div className="flex gap-2">
          <Suspense>
            <ThemeSwitcher />
            <UserButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
