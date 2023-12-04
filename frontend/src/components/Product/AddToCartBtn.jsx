import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { LoginContext } from '../../contexts/LoginContext';

export const AddToCartBtn = ({pid}) => {
    const { token } = useContext(LoginContext);

    const addToCart = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/cart/product/${pid}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
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
