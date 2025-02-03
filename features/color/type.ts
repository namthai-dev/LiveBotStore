export interface CreateColorParams {
  storeId: string;
  name: string;
  value: string;
}

export interface UpdateColorParams {
  id: string;
  name?: string;
  value?: string;
}
