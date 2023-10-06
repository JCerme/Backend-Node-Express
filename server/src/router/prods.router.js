import { Router } from 'express';
const router = Router();
import { createProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js';
import { isAdmin } from '../helpers/admin.js';

// PRODUCTS
router.post('/', isAdmin, createProduct);
router.put('/:pid', isAdmin, updateProduct)
router.delete('/:pid', isAdmin, deleteProduct)

export default router;