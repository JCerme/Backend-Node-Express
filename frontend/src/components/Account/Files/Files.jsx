import React, { useEffect, useState } from 'react';
import { FaPassport } from "react-icons/fa6";
import { MdMapsHomeWork, MdAccountBalance } from "react-icons/md";
import { UploadDoc } from './UploadDoc';
import { toast } from 'react-toastify';

export const Files = ({ user, setUser }) => {
    const [ haveAllDocs, setHaveAllDocs ] = useState(false);

    useEffect(() => {
        setHaveAllDocs(
            user?.documents?.length === 3 
            && user?.documents?.find(doc => doc.includes('id_certificate'))
            && user?.documents?.find(doc => doc.includes('home_address'))
            && user?.documents?.find(doc => doc.includes('account_status'))
        );
    }, [user]);

    const requestPremium = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/premium`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            credentials: 'include',
        })

        response.ok
        ? setUser({...user, premium: true})
        : toast.error(await response.text())
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Files:</h2>
            <div className="grid grid-cols-3 mt-4 gap-4 text-center">
                <UploadDoc user={user} setUser={setUser} type='id_certificate' text="ID certificate">
                    <FaPassport className='text-4xl'/>
                </UploadDoc>
                <UploadDoc user={user} setUser={setUser} type='home_address' text="Home Address">
                    <MdMapsHomeWork className='text-4xl'/>
                </UploadDoc>
                <UploadDoc user={user} setUser={setUser} type='account_status' text="Account Status">
                    <MdAccountBalance className='text-4xl'/>
                </UploadDoc>
            </div>
            {!user?.premium && haveAllDocs &&
            <button onClick={(e) => requestPremium(e)} className='cursor-pointer w-full bg-blue-600 hover:bg-blue-500 duration-300 text-white text-center py-2 px-3 font-semibold rounded-md mt-4'>
                Request premium plan
            </button>
            }
        </div>
    )
}
