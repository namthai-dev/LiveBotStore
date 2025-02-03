'use client';

import { useEffect, useState } from 'react';
import { StoreModal } from './modals/store-modal';
import BillboardModal from './modals/billboard-modal';
import CategoryModal from './modals/category-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
      <BillboardModal />
      <CategoryModal />
    </>
  );
};
