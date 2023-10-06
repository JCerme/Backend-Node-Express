import React from 'react'
import { ModifyStock } from './ModifyStock';

export const Product = ({ products, setCart, setSummaryLoader }) => {
    const removeFromCart = (e, pid) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/cart/product/' + pid, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => data.status === 'success') && window.location.reload()
        .catch(err => console.log(err))
    }

    return (
        products?.map(p => (
            <a href={"/product/"+p?.product?._id} key={p?.product?._id} className="hover:shadow-lg duration-300 w-full rounded-lg border p-2 flex gap-4">
                <img src={p?.product?.thumbnail} className="rounded max-w-[120px]" />
                <div className="flex items-center justify-between w-full mx-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl text-blue-600">{p?.product?.title}</h2>
                        <span id="units_text" className="text-gray-400">Max {p?.product?.stock} unit/s.</span>
                    </div>
                    <ModifyStock pid={p?.product?._id} max={p?.product?.stock} units={p?.units} setCart={setCart} setSummaryLoader={setSummaryLoader}/>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl">${p?.product?.price}</span>
                        <span onClick={(e) => removeFromCart(e, p?.product?._id)}
                        id="removeFromCart" className="text-sm text-red-600 hover:underline rounded py-1 px-3 duration-300">
                            Remove
                        </span>
                    </div>
                </div>
            </a>
        ))
    )
}
