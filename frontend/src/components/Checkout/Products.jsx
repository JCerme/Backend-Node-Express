import React from 'react'

export const Products = ({cart}) => {
    return (
    cart?.products?.map(p => (
        <div className='grid grid-cols-4 gap-4 items-center' key={p?.product?._id}>
            <img src={p?.product?.thumbnail} className="col-span-1 rounded bg-gray-300 aspect-square"/>
            <div className="col-span-2 flex flex-col">
                <h3 className='text-xl font-bold'>
                    {p?.product?.title}
                </h3>
                <div className="flex mt-auto justify-between">
                    <span className='text-blue-400'>
                        {p?.units} x ${p?.product?.price}
                    </span>
                </div>
            </div>
            <div className="col-span-1 text-center">
                <div className="flex flex-col">
                <span className='text-xl'>${(p.product.price * p.units).toFixed()}</span>
                <span className='text-gray-400 -mt-1 text-sm'>+ taxes</span>
                </div>
            </div>
        </div>
    ))
    )
}
