import { Model } from 'mongoose';

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderModel extends Model<TOrder> {
  isProductExists(productId: string): Promise<TOrder | null>;
}
