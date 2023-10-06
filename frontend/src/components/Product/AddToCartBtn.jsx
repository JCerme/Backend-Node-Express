import React from 'react'
import { toast } from 'react-toastify';

export const AddToCartBtn = ({pid}) => {
    const addToCart = () => {
        fetch('http://localhost:8080/api/cart/product/' + pid, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            data.status === 'success'
            ? toast.success('Product added successfully to the cart')
            : toast.error(data.message);
        })
        .catch(e => toast.error(e));
    }

    return (
        <button id="addToCart"
        onClick={() => addToCart()}
        className="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white font-bold">
            Add to Cart
        </button>
    )
}
