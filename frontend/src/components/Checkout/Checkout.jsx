import React, { useEffect, useState } from 'react'
import { Form } from './Form'
import { SuccessModal } from './SuccessModal'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PKEY);
import PaymentService from '../../services/PaymentService'

export const Checkout = () => {
    const [modal, setModal] = useState(false)
    const [clientSecret, setClientSecret] = useState(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);

    useEffect(() => {
        const getClientSecret = async () => {
            const service = new PaymentService();
            service.createPaymentIntent({
                callbackSuccess: res => {
                    setClientSecret(res.payload.client_secret)
                    setPaymentIntentId(res.payload.id)
                },
            });
        }
        getClientSecret();
    }, []);

    return (clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div className='max-w-[1024px] mx-auto'>
                <h2 className='my-16 relative uppercase font-light italic text-blue-500 text-center text-3xl'>
                    "Just one step more to live a new adventure"
                    <span className='w-full text-center uppercase opacity-10 text-blue-500 text-6xl font-bold absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                    new adventure
                    </span>
                </h2>
                <Form clientSecret={clientSecret} paymentIntentId={paymentIntentId}/>
                {modal && <SuccessModal state={modal} setModal={setModal}/>}
            </div>
        </Elements>
    ))
}
