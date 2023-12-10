import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../contexts/LoginContext';
import { GoCheckCircleFill } from "react-icons/go";
import { toast } from 'react-toastify';

export const UploadDoc = ({user, setUser, type, children, text}) => {
    const [ alreadyUploaded, setAlreadyUploaded ] = useState(
        user?.documents?.find(doc => doc.includes(type))
    );

    useEffect(() => {
        setAlreadyUploaded(user?.documents?.find(doc => doc.includes(type)));
    }, [user]);

    const { token } = useContext(LoginContext);

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('document', file);

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/files/documents`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${token}` },
            credentials: 'include',
            body: formData,
        })
        if (res.ok) {
            const filename = await res.text();
            const valid = filename.includes(type);
            if (valid) {
                setUser({...user, documents: [...user.documents, filename]});
                setAlreadyUploaded(true);
                toast.success('File uploaded successfully');
            } else {
                toast.error(`Filename should be named as "${type}.pdf"`);
            }
        } else {
            toast.error('Error uploading file');
        }
    }

    return (
        <div className='relative group'>
            {!alreadyUploaded && <div className='w-[140%] opacity-0 transition-opacity duration-500 group-hover:block group-hover:opacity-100 absolute bg-gray-800 text-white rounded-lg py-2 px-5 z-10 -top-8 left-1/2 -translate-x-1/2'>
                File should be named as "{type}.pdf" to upload.
            </div>}
            <label className={`flex p-4 flex-col gap-2 justify-center items-center duration-300 cursor-pointer h-40 rounded-lg ` + (alreadyUploaded ? 'bg-blue-50 border-2 text-blue-400 border-blue-300 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400' : 'bg-gray-50 border-2 text-gray-400 border-gray-300 hover:bg-gray-100 hover:text-gray-600 hover:border-gray-400')}>
                {
                alreadyUploaded
                ? <><GoCheckCircleFill className='text-4xl'/>{text}</>
                : <>{children} Upload your {text} <input onChange={(e) => uploadFile(e)} type="file" accept="application/pdf" className='hidden'/></>
                }
            </label>
        </div>
    )
}
