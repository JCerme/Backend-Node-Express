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
// Hundred mock products
router.get('/mockingproducts', (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            _id: "64bd04791c8cd0e5be8d656f",
            code: "BP123",
            title: "Model #006",
            description: "Attention young adventurers! 🛥️⚓ We are excited to present you our offer to rent a mini yacht in Miami for only $250 😱✨ Discover the sensation of sailing through crystal clear waters and enjoy the freedom that only a boat can offer 🌊☀️ Don't miss out!\n\ni ️ Details:\n✅ Model: Mini Yacht\n✅ Price: $250\n✅ Location: Miami",
            price: 250,
            thumbnail: "https://cdn.leonardo.ai/users/e1b24da5-638b-4c50-af03-b67f07688e68/generations/269966fc-b86e-4a49-9ebf-a38373a7ab5a/Leonardo_Creative_A_breathtaking_aerial_view_of_a_serene_seclu_1.jpg",
            stock: 10,
            __v: 0,
            category: "boats",
        });
    }
    res.json(products);
});

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
router.get('/chat', getMessages);

export default router;