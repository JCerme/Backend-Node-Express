import { Router } from 'express';
import PaymentService from '../services/payment.repository.js';
import { cartService, userService } from '../services/index.js';
import { authentication } from '../middlewares/auth.js';
const router = Router();

router.get('/payment-intents', authentication, async (req, res, next) => {
    try {
        const { cart } = await userService.getUserById(req.uid) || { cart: null };
        if(!cart) return res.status(404).send('Cart is empty');
        const data = await cartService.getCart(cart);
        if(!data) return res.status(404).send('Cart is empty');

        let total = 0;
        data?.products?.forEach(item => {
            total += item.product.price * item.units;
        });

        if (total <= 0) return res.status(400).send('Invalid total amount');

        const service = new PaymentService();
        const paymentIntent = await service.createPaymentIntent({
            amount: total * 100 * 1.21, // Assuming the price is in dollars, convert to cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        return res.send({ status: 'success', payload: paymentIntent });
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
});

export default router;