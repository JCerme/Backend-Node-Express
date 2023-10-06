import React from 'react'

export const CreditCard = () => {
    return (
        <div>
            <h2 className='text-2xl text-blue-500 mt-8 mb-4'>Payment Method:</h2>
            <div className='border rounded-lg p-8 bg-white hover:shadow-lg duration-300 flex flex-col gap-4 text-gray-600'>
                <div className='flex flex-col flex-1 gap-2'>
                    <label htmlFor="card_number">Card Number: *</label>
                    <input className='w-full py-2 px-4 bg-gray-100 rounded border-b-2 border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'
                    type="text" id="card_number" name="card_number" autoComplete="card_number" required value='1234 1234 1234 1234' disabled/>
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="exp_date">Expiration date: *</label>
                        <input className='w-full py-2 px-4 bg-gray-100 rounded border-b-2 border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'
                        type="date" id="exp_date" name="exp_date" autoComplete="exp_date" required value='2028-12-12' disabled/>
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="cvc">CVC: *</label>
                        <input className='w-full py-2 px-4 bg-gray-100 rounded border-b-2 border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'
                        type="text" id="cvc" name="cvc" required placeholder='123' value="123" disabled/>
                    </div>
                </div>
            </div>
        </div>
    )
}
