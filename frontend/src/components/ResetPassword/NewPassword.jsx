import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Passwords } from './Passwords';
import { toast } from 'react-toastify';

export const NewPassword = () => {
    const { uid, code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/check-pwd-code/${uid}/${code}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if(data.message !== 'OK'){
                toast.error(data.message);
                setTimeout(() => navigate('/reset-password'), 3000);
            }
        })
        .catch((err) => {
            toast.error('An error has ocurred. You will be redirected in 3 seconds.');
            setTimeout(() => navigate('/reset-password'), 3000);
        });
    }, []);

    const sendPassword = async (e) => {
        e.preventDefault();
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.:_-])[A-Za-z\d@$!%*?&.:_-]{8,32}$/;
        if(e.target.new_password.value === e.target.repeat_password.value){
            if(!passwordRegex.test(e.target.new_password.value)){
                toast.error("The password must have at least one lowercase letter, one uppercase letter, one number and one special character (@$!%?&.:_-), with a minimum length of 8 characters.");
                return;
            }
            fetch(`${import.meta.env.VITE_BASE_URL}/api/update-password/${uid}/${code}`, {
                method: 'POST',
                body: JSON.stringify(
                    {'uid': uid, 'password': e.target.new_password.value}
                ),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(data => {
                if(data.message === 'OK'){
                    toast.success('Password updated successfully');
                    navigate('/login');
                } else {
                    toast.error(data.message);
                }
            })
            .catch((err) => {
                toast.error('An error has ocurred.');
            });
        } else {
            toast.error("The passwords don't match.");
            return;
        }
    }

    return (
        <div className="login flex justify-center items-center lg:grid lg:grid-cols-2 gap-5 h-screen text-md">
            <div className="p-4 flex-1 h-screen">
                <img src="/media/login.jpg" className="rounded-lg object-cover w-full h-full" />
            </div>
            <div className="flex flex-col justify-center w-full items-center">
                <div className="w-2/3">
                    <h2 className="text-gradient mb-10 text-2xl sm:text-4xl md:text-[3rem] md:leading-[3rem] font-bold tracking-tight">
                        Write your new password
                    </h2>
                    <Passwords sendPassword={sendPassword}/>
                </div>
            </div>
        </div>
    )
}

export default NewPassword