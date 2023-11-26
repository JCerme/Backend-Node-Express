import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SKEY);
    }

    async createPaymentIntent({ amount, currency, payment_method_types }) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types,
            });

            return paymentIntent;
        } catch (error) {
            throw error;
        }
    }

    async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
        try {
            if (!paymentIntentId) throw new Error("PaymentIntentId not found");
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId, {
                payment_method: paymentMethodId,
            });

            return paymentIntent;
        } catch (error) {
            throw error;
        }
    }
}