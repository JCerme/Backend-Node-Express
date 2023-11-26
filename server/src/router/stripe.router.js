import { Router } from 'express';
import PaymentService from '../services/payment.repository.js';
import { cartService } from '../services/index.js';
const router = Router();

router.get('/payment-intents', async (req, res, next) => {
    const { cart } = req.session.user || { cart: null };
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

    req.session.paymentIntentId = paymentIntent.id;
    return res.send({ status: 'success', payload: paymentIntent });
});

export default router;