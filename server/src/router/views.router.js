import { Router } from 'express';
const router = Router();
import { authentication } from '../helpers/auth.js';
import { getProducts, getProductByID } from "../controllers/products.controller.js";
import { getCart, getCartByID } from "../controllers/carts.controller.js";
import { getMessages } from "../controllers/messages.controller.js";
import PublicUserDTO from '../DAO/DTO/publicUser.dto.js';

// MAIN ROUTER
router.get('/', getProducts);

// Real time products
router.get('/realtimeproducts', getProducts);
// Products
router.get('/products', getProducts);
// Single product
router.get('/products/:pid', getProductByID);

// Carts
router.get('/cart', getCart);
router.get('/cart/:cid', getCartByID);

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.json({ logged: false });
});
// Account
router.get("/account", authentication, (req, res) => {
    res.json({ user: new PublicUserDTO(req.session.user) });
});

// Chat
router.get('/chat', authentication, getMessages);

export default router;