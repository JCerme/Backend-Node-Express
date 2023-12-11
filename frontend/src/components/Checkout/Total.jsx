import React, { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext';

export const Total = ({cart}) => {
    const { user } = useContext(LoginContext);
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
        const discount = user?.premium ? 0.9 : 1;
        return ((getSubtotal() + parseFloat(calcIVA())) * discount).toFixed(2);
    }

    return (
    <div className="flex flex-col mt-4">
        <div className="flex justify-between pb-2 border-b italic">
            <span className='text-gray-400'>Subtotal</span>
            <span className='text-gray-400'>${getSubtotal()} + IVA</span>
        </div>
        <div className="flex justify-between text-xl pt-2">
            <span className=''>Total</span>
            {
            user?.premium
            ? <span className='text-green-600'>${getTotal()}</span>
            : <span>${getTotal()}</span>
            }
        </div>
    </div>
    )
}
