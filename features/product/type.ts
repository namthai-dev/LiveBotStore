export interface CreateProductParams {
  storeId: string;
  categoryId: string;
  sizeId: string;
  colorId: string;
  name: string;
  price: number;
}

export interface CreateProductImageParams {
  productId: string;
  url: string;
}
