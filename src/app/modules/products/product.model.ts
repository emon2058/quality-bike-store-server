import mongoose, { model, Schema } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        message: `{VALUES} should be 'Mountain', 'Road', 'Hybrid', 'Electric'`,
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('find', function (next) {
  this.find({ inStock: { $ne: false } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ inStock: { $ne: false } });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { inStock: { $ne: false } } });
  next();
});

productSchema.statics.isProductExists = async function (id: string) {
  const existingProduct = await Product.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return existingProduct;
};
export const Product = model<TProduct, ProductModel>('Product', productSchema);
