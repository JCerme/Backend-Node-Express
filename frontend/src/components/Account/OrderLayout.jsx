import React from 'react'

export const OrderLayout = ({ order }) => {
    return (
        <div className='border rounded-lg p-8 select-none hover:shadow-lg duration-300'>
            <h3 className='text-xl font-bold'>Code: {order?.code}</h3>
            <div className='flex justify-between items-center mt-1'>
                <p className='text-gray-400'>Amount:</p>
                <p className='text-xl font-bold'>
                    <span className='text-sm font-medium text-gray-300 mr-2'>
                        {order?.products?.length} products /
                    </span>
                    ${order?.amount}
                </p>
            </div>
        </div>
    )
}
