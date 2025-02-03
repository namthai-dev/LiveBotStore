export interface CreateCategoryParams {
  storeId: string;
  billboardId: string;
  name: string;
}

export interface UpdateCatergoryParams {
  id: string;
  billboardId?: string;
  name?: string;
}
