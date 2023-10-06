import React from 'react'

export const Form = ({
    nameRef,
    lastNameRef,
    emailRef,
    addressRef,
    postalCodeRef,
    cityRef,
    stateRef,
    countryRef,
    errors,
}) => {
    return (
        <div>
            <h2 className='text-2xl text-blue-500 mt-8 mb-4'>Purchaser data:</h2>
            <div className='border rounded-lg p-8 hover:shadow-lg duration-300 flex flex-col gap-4 text-gray-600'>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="first_name">First Name: *</label>
                        <input ref={nameRef} className={(errors?.name ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="first_name" name="first_name" autoComplete="first_name" placeholder='John'/>
                        <span className='text-red-600'>{errors?.name}</span>
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="last_name">Last Name: *</label>
                        <input ref={lastNameRef} className={(errors?.lastName ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="last_name" name="last_name" autoComplete="last_name" placeholder='Doe'/>
                        <span className='text-red-600'>{errors?.lastName}</span>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-2'>
                    <label htmlFor="email">Email Address: *</label>
                    <input ref={emailRef} className={(errors?.email ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                    type="text" id="email" name="email" autoComplete="email" placeholder='johndoe@gmail.com'/>
                    <span className='text-red-600'>{errors?.email}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-2 gap-2'>
                        <label htmlFor="address">Address: *</label>
                        <input ref={addressRef} className={(errors?.address ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="address" name="address" autoComplete="address" placeholder='250 SE 50 Biscayne'/>
                        <span className='text-red-600'>{errors?.address}</span>
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="postal_code">Postal Code: *</label>
                        <input ref={postalCodeRef} className={(errors?.postalCode ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="postal_code" name="postal_code"autoComplete="postal_code" placeholder='31336'/>
                        <span className='text-red-600'>{errors?.postalCode}</span>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="city">City: *</label>
                        <input ref={cityRef} className={(errors?.city ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="city" name="city" autoComplete="city" placeholder='Miami'/>
                        <span className='text-red-600'>{errors?.city}</span>
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="state">State: *</label>
                        <input ref={stateRef} className={(errors?.state ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="state" name="state" autoComplete="state" placeholder='Florida'/>
                        <span className='text-red-600'>{errors?.state}</span>
                    </div>
                    <div className='flex flex-col flex-1 gap-2'>
                        <label htmlFor="country">Country: *</label>
                        <input ref={countryRef} className={(errors?.country ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                        type="text" id="country" name="country" autoComplete="country" placeholder='United States'/>
                        <span className='text-red-600'>{errors?.country}</span>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-2'>
                    <textarea className='w-full py-2 px-4 bg-gray-100 rounded border-b-2 border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'
                    placeholder="Notes..." rows="3" type="text" id="notes" name="notes"/>
                </div>
            </div>
        </div>
    )
}
