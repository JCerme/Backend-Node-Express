import React from 'react'

const Mail = ({sendMail, buttonRef}) => {
    return (
        <form className="space-y-5 sm:text-lg" onSubmit={(e) => sendMail(e)}>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-gray-50 w-full border focus:outline-none rounded focus:border-gray-400 px-2 py-1 placeholder:font-light"
                    placeholder="swaip_app@email.com"
                />
            </div>
            <button
                ref={buttonRef}
                type="submit"
                className="text-lg flex w-full justify-center rounded-md bg-blue-600 text-white px-3 py-1.5 font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6675C7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Send reset password email
            </button>
        </form>
    )
}

export default Mail
