import React from 'react'

export const CustomerForm = ({
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
                    <select ref={countryRef} className={(errors?.country ? 'outline outline-2 outline-red-600 ' : 'border-b-2 ') + 'w-full py-2 px-4 bg-gray-100 rounded border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'}
                    id="country" name="country" autoComplete="country">
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="MX">Mexico</option>
                        <option value="GB">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="JP">Japan</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="BR">Brazil</option>
                        <option value="ZA">South Africa</option>
                        <option value="AU">Australia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="RU">Russia</option>
                        <option value="SG">Singapore</option>
                        <option value="KR">South Korea</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="FI">Finland</option>
                        <option value="DK">Denmark</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="GR">Greece</option>
                        <option value="PT">Portugal</option>
                        <option value="PL">Poland</option>
                        <option value="HU">Hungary</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="IE">Ireland</option>
                        <option value="RO">Romania</option>
                        <option value="CH">Switzerland</option>
                        <option value="AT">Austria</option>
                        <option value="SK">Slovakia</option>
                        <option value="BG">Bulgaria</option>
                        <option value="HR">Croatia</option>
                        <option value="SI">Slovenia</option>
                        <option value="EE">Estonia</option>
                        <option value="LV">Latvia</option>
                        <option value="LT">Lithuania</option>
                    </select>
                    <span className='text-red-600'>{errors?.country}</span>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-2'>
                <textarea className='w-full py-2 px-4 bg-gray-100 rounded border-b-2 border-blue-500 focus:outline-0 focus:bg-blue-100 focus:text-blue-500 duration-300'
                placeholder="Notes..." rows="3" type="text" id="notes" name="notes"/>
            </div>
        </div>
    )
}
