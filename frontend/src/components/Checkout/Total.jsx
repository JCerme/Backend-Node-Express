import React from 'react'

export const Total = ({cart}) => {
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
    <div className="flex flex-col mt-4">
        <div className="flex justify-between pb-2 border-b italic">
            <span className='text-gray-400'>Subtotal</span>
            <span className='text-gray-400'>${getSubtotal()} + IVA</span>
        </div>
        <div className="flex justify-between text-xl pt-2">
            <span className=''>Total</span>
            <span>${getTotal()}</span>
        </div>
    </div>
    )
}
