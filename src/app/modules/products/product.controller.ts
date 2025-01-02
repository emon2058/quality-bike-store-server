import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodParseData);

    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.send({
      message: error.issues[0].message || 'Validation failed',
      success: false,
      error,
      stack: `${error.name} and path is : ${error.issues[0].path}`,
    });
  }
};

const singleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);
    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const allProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductIntoDB();
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateSingleProductIntoDB(
      productId,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Bike updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
export const ProductController = {
  createProduct,
  allProduct,
  singleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
