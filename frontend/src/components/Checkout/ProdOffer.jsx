import React from 'react'

export const ProdOffer = ({prod}) => {
    return (
    <div className='grid grid-cols-4 gap-4'>
        <div className="col-span-1 bg-gray-300 aspect-square"></div>
        <div className="col-span-3 flex flex-col">
            <h3 className='text-xl font-bold'>{prod.title}</h3>
            <div className="flex mt-auto justify-between">
                <span className='text-red-600'>
                    Before: &nbsp;
                    <span className='line-through '>${prod.price}</span>
                </span>
                {'--->'}
                <span className='text-green-600'>
                    After: ${(prod.price * (100 - prod.sale)).toFixed()}
                </span>
            </div>
        </div>
    </div>
    )
}
