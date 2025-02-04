export interface CreateProductParams {
  storeId: string;
  categoryId: string;
  sizeId: string;
  colorId: string;
  name: string;
  price: number;
  images?: ProductImage[];
}

export interface ProductImage {
  id?: string;
  url: string;
}

export interface UpdateProductParams {
  id: string;
  categoryId?: string;
  sizeId?: string;
  colorId?: string;
  name?: string;
  price?: number;
  images?: ProductImage[];
}
