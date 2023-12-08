import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [ user, setUser ] = useState({});
    const [ logged, setLogged ] = useState(false)
    const [ token, setToken ] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            if (!token) return navigate('/login');
            const headers = {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`},
                credentials: 'include',
            }
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sessions/current`, headers);
            const res = await response.json();
            if (res.valid) setUser(res.user);
            return res;
        } catch(e) {
            navigate('/')
        }
    }

    const login = async (email, password) => {
        const headers = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'email': email, 'password': password }),
            credentials: 'include',
        }
    
        fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, headers)
        .then(response => response.json())
        .then(res => {
            if (res.message === 'OK') {
                setLogged(res.logged);
                navigate('/');
            } else if(res.message === 'REDIRECT'){
                navigate('/premium-plan');
            } else {
                notify(res.message);
            }
        })
        .catch(err => {
            notify(err);
        });

    };

    const register = (firstname, surname, email, password) => {
        const headers = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": firstname,
                "surname": surname,
                "email": email,
                "password": password,
            }),
        }

        fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, headers)
        .then(response => response.json())
        .then(res => {
            if (res.message === 'OK') {
                login(email, password);
            } else {
                notify(res.message);
            }
        })
        .catch(err => {
            notify(err);
        })
    }

    return (
        <LoginContext.Provider value={{
            user,
            setUser,
            logged,
            setLogged,
            token,
            setToken,
            getUser,
            login,
            register,
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}