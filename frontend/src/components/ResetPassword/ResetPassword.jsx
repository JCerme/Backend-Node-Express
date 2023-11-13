import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Mail from './Mail';

export const ResetPassword = () => {
    const buttonRef = useRef(null);

    const sendMail = (e) => {
        e.preventDefault();
        buttonRef.current.disabled = true;
        buttonRef.current.innerText = 'Sending...';

        fetch(`${import.meta.env.VITE_BASE_URL}/api/reset-password`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'to': e.target.email.value})
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === 'OK'){
                toast.success('Reset password email sent');
            } else {
                toast.error(data.message);
            }
        })
        .catch((err) => toast.error('An error has ocurred. Try again later.'))
        .finally(() => {
            buttonRef.current.disabled = false;
            buttonRef.current.innerText = 'Send reset password email';
        });
    }

    return (
        <div className="login flex justify-center items-center lg:grid lg:grid-cols-2 gap-5 h-screen text-md">
            <div className="p-4 flex-1 h-screen">
                <img src="/media/login.jpg" className="rounded-lg object-cover w-full h-full" />
            </div>
            <div className="flex flex-col justify-center w-full items-center">
                <div className="w-2/3">
                    <h2 className="text-gradient mb-10 text-2xl sm:text-4xl md:text-[3rem] md:leading-[3rem] font-bold tracking-tight">
                        Write your email address
                    </h2>
                    <Mail sendMail={sendMail} buttonRef={buttonRef}/>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;