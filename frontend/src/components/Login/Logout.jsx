import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/logout', { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            !res.logged && navigate('/login');
        });
    }, []);
}
