import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductIntoDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductIntoDB = async (productId: string) => {
  if (await Product.isProductExists(productId)) {
    const result = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
    ]);
    return result;
  } else {
    throw Error('this bike is not exists');
  }
};

const deleteSingleProductFromDB = async (id: string) => {
  if (await Product.isProductExists(id)) {
    const result = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { inStock: false },
    );
    return result;
  } else {
    throw Error('this bike is not exists');
  }
};

const updateSingleProductIntoDB = async (id: string, updateData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  getSingleProductIntoDB,
  deleteSingleProductFromDB,
  updateSingleProductIntoDB,
};
