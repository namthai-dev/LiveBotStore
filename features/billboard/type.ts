export interface CreateBillboardParams {
  storeId: string;
  label: string;
  imageUrl: string;
}

export interface UpdateBillboardParams {
  id: string;
  label?: string;
  imageUrl?: string;
}
