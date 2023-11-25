import { useState, useLayoutEffect } from 'react'
import { UserCard } from './UserCard';
import { Orders } from './Orders';
import { Files } from './Files';

export const Account = () => {
    const [user, setUser] = useState({});

    useLayoutEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/account`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setUser(data.user))
    }, [])

    return (
        <div className="max-w-[1024px] py-4 mx-auto mt-16 mb-24 grid grid-cols-3 gap-20">
            <UserCard user={user} />
            <div className='col-span-2 flex flex-col gap-8'>
                <Orders user={user} />
                <hr/>
                <Files user={user}/>
            </div>
        </div>
    )
}
