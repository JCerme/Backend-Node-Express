import React from 'react'
import { SlPencil } from "react-icons/sl";

export const UserCard = ({ user }) => {
    return (
        <div className='col-span-1 border duration-500 rounded-lg p-8 hover:shadow-lg duration-300 select-none'>
            <div className='group relative cursor-pointer rounded-full w--full aspect-square mx-auto mb-6'>
                <img src={user?.avatar || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"} className="w-full" alt="avatar"/>
                <div className='group-hover:opacity-100 duration-500 opacity-0 absolute left-0 top-0 w-full h-full rounded-full bg-white bg-opacity-70 flex justify-center items-center text-6xl'>
                    <SlPencil/>
                </div>
            </div>
            <ul>
                <li className='text-2xl font-bold leading-7'>
                    {user?.first_name} {user?.last_name}
                </li>
                <li className='text-blue-500'>{user?.email}</li>
                <li className='text-gray-400 text-sm'>Rol: {user?.role || "user"}</li>
            </ul>
        </div>
    )
}
