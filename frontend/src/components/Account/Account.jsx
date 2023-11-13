import { useState, useLayoutEffect } from 'react'

export const Account = () => {
    const [user, setUser] = useState({})
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
        <div className="max-w-[1024px] py-4 mx-auto mt-16 mb-24">
            <ul>
                <li>Name: {user?.first_name} {user?.last_name}</li>
                <li>Email: {user?.email}</li>
                <li>Rol: {user?.role}</li>
            </ul>
        </div>
    )
}
