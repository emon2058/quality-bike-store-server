import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/modules/products/product.route';
import { OrderRouter } from './app/modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('This is bike page');
});

export default app;
