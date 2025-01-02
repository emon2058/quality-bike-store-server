import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.get('/:productId', ProductController.singleProduct);
router.get('/', ProductController.allProduct);
router.post('/', ProductController.createProduct);
router.delete('/:productId', ProductController.deleteSingleProduct);
router.put('/:productId', ProductController.updateSingleProduct);

export const ProductRouter = router;
