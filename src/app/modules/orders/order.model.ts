import mongoose, { model, Schema } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';
import { Product } from '../products/product.model';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      require: true,
    },
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
orderSchema.pre('save', async function () {
  const order = this;
  const product = await Product.findOne({ _id: order.product });
  if (product) {
    const updateQuantity = product.quantity - order.quantity;
    if (updateQuantity >= 0) {
      const inStock = updateQuantity > 0;

      await Product.updateOne(
        { _id: order.product },
        {
          $set: { quantity: updateQuantity, inStock: inStock },
        },
      );
    } else {
      throw Error(
        `Order quantity is :${order.quantity}. It should be less than ${product.quantity}`,
      );
    }
  } else {
    throw Error('Product not found');
  }
});
orderSchema.statics.isProductExists = async function (productId: string) {
  const existingProduct = await Product.findOne({ _id: productId });
  return existingProduct;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
