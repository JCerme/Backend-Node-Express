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
import { authentication } from '../middlewares/auth.js';

// CART
router.post('/', authentication, addCart)
router.put('/:cid', authentication, updateCart);
router.delete('/:cid', authentication, clearCart);
router.post('/product/:pid', authentication, addProductToCart);
router.put('/product/:pid', authentication, updateProductUnits);
router.delete('/product/:pid', authentication, deleteProductFromCart);

export default router;
