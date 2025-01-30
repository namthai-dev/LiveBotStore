export interface CreateOrderParams {
  storeId: string;
  phone: string;
  address: string;
}

export interface CreateOrderItemProps {
  orderId: string;
  productId: string;
}
