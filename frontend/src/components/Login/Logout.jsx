import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/logout`, { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            !res.logged && navigate('/login');
        });
    }, []);
}
