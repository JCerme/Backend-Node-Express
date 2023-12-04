import { orderService, productService, userService } from "../services/index.js";
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
        req.body.purchase_date = new Date();
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
        const { cid } = await userService.getUserById(req.uid);
        const cart = await userService.getCart(cid);
        const orderResume = cart.products.map(async (product) => {
            const prod = await productService.getProduct(product.pid);
            return `<li>${prod.title}  ||  ${prod.price} x ${product.units}  ||  ${prod.price * product.units * 1.21}</li>`;
        }).join('');
        const mailService = new Mail();
        const emailData = {
            to: req.body.email,
            subject: 'Order confirmation',
            text: `Your order has been confirmed. Your order code is ${req.body.code}.`,
            html: `
                <h1>Your order on <a href="https://boatpump.jcerme.com">BoatPump</a> has been confirmed.</h1>
                <p>Your order code is <span style="color:#2563EB">${req.body.code}</span>.</p><br><br>
                <p>Order resume:</p>
                <ul>
                    ${orderResume}
                </ul><br><br>
                <p>Total: ${result.amount}</p>
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