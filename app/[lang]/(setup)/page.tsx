'use client';

import { useEffect } from 'react';
import { useStore } from '@/features/store/store';

export default function Setup() {
  const store = useStore();

  useEffect(() => {
    if (!store.isOpen) {
      store.onOpen();
    }
  }, [store.isOpen, store.onOpen]);

  return null;
}
