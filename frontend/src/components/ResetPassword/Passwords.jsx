import React from 'react'
import { PasswordField } from '../../helpers/PasswordField'

export const Passwords = ({sendPassword}) => {
    return (
        <form className="space-y-5 sm:text-lg" onSubmit={(e) => sendPassword(e)}>
            <label htmlFor="new_password" className="required block font-medium text-gray-900">
                New password:
            </label>
            <div className="mt-2">
                <PasswordField id="new_password" autocomplete="new_password"/>
            </div>
            <label htmlFor="repeat_password" className="required block font-medium text-gray-900">
                Repeat your new password:
            </label>
            <div className="mt-2">
                <PasswordField id="repeat_password" autocomplete="new_password"/>
            </div>
            <button
                type="submit"
                className="text-lg flex w-full justify-center rounded-md bg-blue-600 text-white px-3 py-1.5 font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6675C7]"
            >
                Update password
            </button>
        </form>
    )
}
