import React from 'react'
import { Loader } from '../Loader';
import { Link } from 'react-router-dom';

export const Summary = ({ cart, summaryLoader }) => {
    const getSubtotal = () => {
        let subtotal = 0;
        cart?.products?.forEach(p => {
            subtotal += p?.product?.price * p?.units;
        })
        return subtotal;
    }

    const calcIVA = () => {
        return (getSubtotal() * 0.21).toFixed(2);
    }

    const getTotal = () => {
        return (getSubtotal() + parseFloat(calcIVA())).toFixed(2);
    }

    return (
        <div className="border rounded-lg p-8">
            <h2 className="text-2xl text-center text-blue-500">
                Summary
            </h2>
            {summaryLoader && <Loader/>}
            {!summaryLoader && (<>
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between">
                    <span className='text-gray-400'>Subtotal</span>
                    <span className='text-gray-400'>${getSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                    <span className='text-gray-400'>Shipping</span>
                    <span className='text-green-600'>Free</span>
                </div>
                <div className="flex justify-between">
                    <span className='text-gray-400'>Tax</span>
                    <span className='text-gray-400'>${calcIVA()}</span>
                </div>
                <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span>${getTotal()}</span>
                </div>
            </div>
            <Link to="/checkout" className="block text-center bg-blue-600 hover:bg-blue-700 duration-300 rounded w-full text-white py-2 mt-4">
                Checkout
            </Link>
            </>)}
        </div>
    )
}
