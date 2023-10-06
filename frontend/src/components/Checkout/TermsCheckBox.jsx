import React from 'react'

export const TermsCheckBox = ({ policyRef, errors}) => {
    return (
        <label className={(errors.policy ? 'text-red-600 ' : 'text-gray-600 ') + 'text-sm'}>
            <input ref={policyRef} type="checkbox" name="terms" className='rounded-full'/>
            &nbsp;&nbsp;I've read and I accept the Privacy Policy and Terms of Use *
        </label>
    )
}
