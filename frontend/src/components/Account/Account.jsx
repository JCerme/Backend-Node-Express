import { useState, useEffect, useContext } from 'react'
import { UserCard } from './UserCard';
import { Orders } from './Orders';
import { Files } from './Files/Files';
import { LoginContext } from '../../contexts/LoginContext';

export const Account = () => {
    const [ user, setUser ] = useState({});
    const { token } = useContext(LoginContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/account`, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setUser(data))
    }, [token])

    return (
        <div className="max-w-[1024px] py-4 mx-auto mt-16 mb-24 items-start grid grid-cols-3 gap-20">
            <UserCard user={user} />
            <div className='col-span-2 flex flex-col gap-8'>
                <Files user={user} setUser={setUser}/>
                <hr/>
                <Orders user={user} />
            </div>
        </div>
    )
}
