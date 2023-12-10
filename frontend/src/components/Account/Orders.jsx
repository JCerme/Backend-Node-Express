import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../contexts/LoginContext';
import { OrderLayout } from './OrderLayout';

export const Orders = () => {
    const [ orders, setOrders ] = useState([]);
    const { token } = useContext(LoginContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
            method: 'GET',
            headers: { "Authorization": `Bearer ${token}` },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setOrders(data?.payload?.orders))
    }, []);

    return (
        <div>
            <h2 className='text-2xl font-bold'>Orders:</h2>
            {orders?.length > 0
            ? <div className='grid grid-cols-2 gap-4 mt-4'>
                {orders?.map(order => <OrderLayout order={order} key={order._id}/>)}
            </div>
            : <p className='text-gray-400'>There is no orders yet.</p>}
        </div>
    )
}
