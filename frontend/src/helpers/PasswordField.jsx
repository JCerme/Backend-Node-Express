import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export const PasswordField = ({id, autocomplete}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                id={id || "password"}
                name={id || "password"}
                type={showPassword ? "text" : "password"}
                autoComplete={autocomplete || "current-password"}
                placeholder={showPassword ? "tuC0ntr4señ4123" : "***********"}
                className="bg-gray-50 w-full border focus:outline-none rounded focus:border-gray-400 px-2 py-1 placeholder:font-light"
                required
            />
            <div className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 text-xl"
            onClick={() => setShowPassword(!showPassword)}>
                <BsEyeSlash className={showPassword ? "text-gray-400" : "hidden"}/>
                <BsEye className={!showPassword ? "text-gray-400" : "hidden"}/>
            </div>
        </div>
    )
}
