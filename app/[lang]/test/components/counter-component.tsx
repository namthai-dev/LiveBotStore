'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSwitchLocaleHref } from '@/hooks/use-switch-locale';

import type { getDictionary } from '@/features/internationalization/get-dictionaries';

export function CounterComponent({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['counter'];
}) {
  const [count, setCount] = useState(0);
  const getSwitchLocaleHref = useSwitchLocaleHref()

  return (
    <div className='flex flex-col'>
      This component is rendered on the client:
      <Link href={getSwitchLocaleHref("vi-VN")}>vi-VN</Link>
      <button onClick={() => setCount(n => n - 1)}>
        {dictionary.decrement}
      </button>
      {count}
      <button onClick={() => setCount(n => n + 1)}>
        {dictionary.increment}
      </button>
    </div>
  );
}