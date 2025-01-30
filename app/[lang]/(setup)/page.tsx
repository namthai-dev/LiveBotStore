'use client';

import { useEffect } from 'react';
import { useStoreModal } from '@/features/store/use-store-modal';

export default function Setup() {
  const store = useStoreModal();

  useEffect(() => {
    if (!store.isOpen) {
      store.onOpen();
    }
  }, [store.isOpen, store.onOpen]);

  return null;
}
