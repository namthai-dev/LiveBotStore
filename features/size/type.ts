export interface CreateSizeParams {
  storeId: string;
  name: string;
  value: string;
}

export interface UpdateSizeParams {
  id: string;
  name?: string;
  value?: string;
}
