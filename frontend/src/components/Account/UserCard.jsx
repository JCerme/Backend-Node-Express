import React, { useContext, useState } from 'react'
import { SlPencil } from "react-icons/sl";
import { LoginContext } from '../../contexts/LoginContext';

export const UserCard = ({ user }) => {
    const [ avatar, setAvatar ] = useState(user.avatar);
    const { token } = useContext(LoginContext);

    const submitAvatar = (e) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        fetch(`${import.meta.env.VITE_BASE_URL}/api/files/avatar`, {
            method: 'POST',
            headers: { "Authorization": `Bearer ${token}` },
            credentials: 'include',
            body: formData
        })
        .then(res => res.text())
        .then(data => setAvatar(data))
    }

    return (
        <div className='relative col-span-1'>
            {user?.premium && (
            <div className='absolute border -top-4 z-10 -right-4 shadow-xl px-6 py-2 bg-white font-bold text-yellow-500 rounded-full'>
                PREMIUM
            </div>
            )}
            <div className={`overflow-hidden relative bg-gray-100 border rounded-xl p-8 select-none ` + (user?.premium ? 'bg-gold text-white' : 'bg-gray-100')}>
                {user?.premium && <span className='shine'></span>}
                <div className='group relative cursor-pointer rounded-full w--full aspect-square mx-auto mb-6'>
                    <img src={
                        avatar || user?.avatar
                        ? `${import.meta.env.VITE_BASE_URL}/files/avatars/${avatar || user?.avatar}`
                        : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"
                        } className="border w-full aspect-square object-cover rounded-full" alt="avatar"/>
                    <label className="cursor-pointer group-hover:opacity-100 duration-500 opacity-0 absolute left-0 top-0 w-full h-full rounded-full bg-white bg-opacity-70 flex justify-center items-center text-6xl text-gray-900">
                        <SlPencil/>
                        <input onChange={(e) => submitAvatar(e)} type="file" className='hidden' accept='image/*'/>
                    </label>
                </div>
                <ul>
                    <li className='text-2xl font-bold leading-7'>
                        {user?.first_name} {user?.last_name}
                    </li>
                    <li className={user?.premium ? 'text-white' : 'text-blue-500'}>{user?.email}</li>
                    <li className={`text-sm ` + (user?.premium ? 'text-white' : 'text-gray-400')}>Rol: {user?.role || "user"}</li>
                </ul>
            </div>
        </div>
    )
}
