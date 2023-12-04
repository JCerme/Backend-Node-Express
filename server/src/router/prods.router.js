import { Router } from 'express';
const router = Router();
import { createProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js';
import { authentication } from '../middlewares/auth.js';
import { authorization } from '../../utils.js';

// PRODUCTS
router.post('/', authentication, authorization('admin'), createProduct);
router.put('/:pid', authentication, authorization('admin'), updateProduct)
router.delete('/:pid', authentication, authorization('admin'), deleteProduct)

export default router;