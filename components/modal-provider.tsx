'use client';

import { useEffect, useState } from 'react';
import { StoreModal } from './modals/store-modal';
import BillboardModal from './modals/billboard-modal';
import CategoryModal from './modals/category-modal';
import SizeModal from './modals/size-modal';
import ColorModal from './modals/color-modal';
import ProductModal from './modals/product-modal';

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
      <SizeModal />
      <ColorModal />
      <ProductModal />
    </>
  );
};
