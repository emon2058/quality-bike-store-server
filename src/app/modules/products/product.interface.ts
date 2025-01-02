import { Model } from 'mongoose';

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(_id: string): Promise<TProduct | null>;
}
