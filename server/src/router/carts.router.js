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
import { isUser } from '../helpers/admin.js';

// CART
router.post('/', addCart)
router.put('/:cid', updateCart);
router.delete('/:cid', clearCart);
router.post('/product/:pid', isUser, addProductToCart);
router.put('/product/:pid', isUser, updateProductUnits);
router.delete('/product/:pid', isUser, deleteProductFromCart);

export default router;
