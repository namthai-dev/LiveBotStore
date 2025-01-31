'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';

import { UserButton } from '@stackframe/stack';

import ThemeSwitcher from './theme-switcher';
import StoreSwitcher from './store-switcher';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const routes = [
  {
    label: 'Overview',
    href: `/dashboard`,
  },
  {
    label: 'Billboards',
    href: `/billboards`,
  },
  {
    label: 'Categories',
    href: `/categories`,
  },
  {
    label: 'Sizes',
    href: `/sizes`,
  },
  {
    label: 'Colors',
    href: `/colors`,
  },
  {
    label: 'Products',
    href: `/products`,
  },
  {
    label: 'Orders',
    href: `/orders`,
  },
  {
    label: 'AI chatbot',
    href: `/chatbot`,
  },
  {
    label: 'Settings',
    href: `/settings`,
  },
];

export default function Header() {
  return (
    <header className="flex justify-between px-8 py-4">
      <div className="flex items-center gap-4">
        <Suspense>
          <StoreSwitcher />
        </Suspense>
        {routes.map((i, idx) => {
          {
            return (
              <NavigationMenu key={idx}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={i.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {i.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            );
          }
        })}
      </div>
      <div className="flex gap-2">
        <Suspense>
          <ThemeSwitcher />
          <UserButton />
        </Suspense>
      </div>
    </header>
  );
}
