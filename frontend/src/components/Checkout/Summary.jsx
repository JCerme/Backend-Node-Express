import React, { useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { Products } from './Products'
import { Total } from './Total'
import { TermsCheckBox } from './TermsCheckBox'

export const Summary = ({ policyRef, errors }) => {
    const [ cart, setCart ] = useState({})
    const [ loader, setLoader ] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/api/cart', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setCart(data.payload))
        .catch(err => toast.error(err))
        .finally(() => setLoader(false))
    }, [])

    return (
        <div className='border rounded-lg p-8 bg-white hover:shadow-lg duration-300'>
            {loader ? <Loader/> : <div className='flex flex-col gap-4'>
                <h2 className='text-2xl text-blue-500'>
                    Summary
                </h2>
                <Products cart={cart}/>
                <Total cart={cart}/>
                <TermsCheckBox policyRef={policyRef} errors={errors}/>
                <button type="submit" className='w-full bg-blue-600 rounded-lg py-2 text-white font-bold text-lg hover:bg-blue-400 duration-300'>
                    Pay now
                </button>
            </div>
            }
        </div>
    )
}
