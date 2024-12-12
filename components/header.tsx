import React, { Suspense } from 'react';
import Link from 'next/link';

import { UserButton } from '@stackframe/stack';
import ThemeSwitcher from './theme-switcher';

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex justify-between">
        <ul className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
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
