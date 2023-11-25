import React from 'react'

export const Orders = ({ user }) => {
    return (
        <div>
            <h2 className='text-2xl font-bold'>Orders:</h2>
            {!user?.orders?.length && <p className='text-gray-400'>There is no orders yet.</p>}
        </div>
    )
}
