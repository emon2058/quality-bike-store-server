import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  if (await Order.isProductExists(orderData.product)) {
    const result = await Order.create(orderData);
    return result;
  }
};

const createRevenueIntoDB = async () => {
  const result = await Order.aggregate([
    {
      $facet: {
        totalRevenue: [
          {
            $project: {
              totalPrice: {
                $multiply: ['$totalPrice', '$quantity'],
              },
            },
          },
          {
            $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
          },
          { $project: { _id: 0, totalRevenue: 1 } },
        ],
      },
    },
  ]);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  createRevenueIntoDB,
};
