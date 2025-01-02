import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodParseData);
    res.send({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
      status: false,
      error,
    });
  }
};

const createRevenue = async (req: Request, res: Response) => {
  const result = await OrderServices.createRevenueIntoDB();
  res.send({
    message: 'revenue',
    data: result[0].totalRevenue,
  });
};
export const OrderController = {
  createOrder,
  createRevenue,
};
