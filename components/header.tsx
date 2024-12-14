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
    href: `/store`,
  },
  {
    label: 'Billboards',
    href: `/store/billboards`,
  },
  {
    label: 'Categories',
    href: `/store/categories`,
  },
  {
    label: 'Sizes',
    href: `/store/sizes`,
  },
  {
    label: 'Colors',
    href: `/store/colors`,
  },
  {
    label: 'Products',
    href: `/store/products`,
  },
  {
    label: 'Orders',
    href: `/store/orders`,
  },
  {
    label: 'AI chatbot',
    href: `/store/chatbot`,
  },
];

export default function Header() {
  return (
    <header className="px-8 py-4">
      <div className="flex justify-between">
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
      </div>
    </header>
  );
}
