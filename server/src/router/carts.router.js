import { Router } from 'express';
const router = Router();
import {
    addCart,
    updateCart,
    clearCart,
    addProductToCart,
    updateProductUnits,
    deleteProductFromCart
} from '../controllers/carts.controller.js';

// CART
router.post('/', addCart)
router.put('/:cid', updateCart);
router.delete('/:cid', clearCart);
router.post('/product/:pid', addProductToCart);
router.put('/product/:pid', updateProductUnits);
router.delete('/product/:pid', deleteProductFromCart);

export default router;
