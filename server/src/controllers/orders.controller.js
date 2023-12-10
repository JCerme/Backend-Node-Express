import { cartService, orderService, userService } from "../services/index.js";
import PaymentService from "../services/payment.repository.js";
import response from "../helpers/response.js";
import { uid } from 'uid';
import Mail from "../DAO/mail.js";
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res, next) => {
    try {
        req.body.purchaser = req.uid;
        req.body.code = uid(10);
        req.body.purchase_date = new Date()

        // Get cart before modifying it
        const { cart: cid } = await userService.getUserById(req.uid);
        const cart = await cartService.getCart(cid);

        // Create order in database
        const result = await orderService.createOrder(req.body);
        const status = result.status === 201 ? 'success' : 'fail';
        if (status === 'fail') throw new Error('Order failed');

        // Confirm the PaymentIntent to finalize payment after handling a required action
        const service = new PaymentService();
        const paymentIntent = await service.confirmPaymentIntent(
            req.body.paymentIntentId,
            req.body.paymentMethodId,
        );
        if (paymentIntent.status !== 'succeeded') throw new Error('Payment failed');

        // Send email
        const orderResume = await Promise.all(cart.products.map(async (p) => {
            return `<li>${p.product.title}  ||  $${p.product.price} x ${p.units}  ||  $${p.product.price * p.units * 1.21}</li>`;
        }));

        const mailService = new Mail();
        const emailData = {
            to: req.body.email,
            subject: 'Order confirmation',
            text: `Your order has been confirmed. Your order code is ${req.body.code}.`,
            html: `
                <h1>Your order on <a href="https://boatpump.jcerme.com">BoatPump</a> has been confirmed.</h1>
                <p>Your order code is <span style="color:#2563EB">${req.body.code}</span>.</p>
                <p>Order resume:</p>
                <ul>
                    ${orderResume.join('')}
                </ul>
                <p>Total: $${result.order.amount}</p>
            `,
        };
        await mailService.sendMail(emailData);
        res.send(await response(status, result, req.query));
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const result = await orderService.getOrders();
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getOrdersByUser = async (req, res, next) => {
    try {
        const result = await orderService.getOrdersByUser(req.uid);
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}

export const getOrderByCode = async (req, res, next) => {
    try {
        const result = await orderService.getOrderByCode(req.params.code);
        if (result.purchaser !== req.uid) throw new Error('Unauthorized');
        res.send(await response('success', result, req.query))
    } catch (error) {
        req.logger.error(error);
        next(error);
    }
}