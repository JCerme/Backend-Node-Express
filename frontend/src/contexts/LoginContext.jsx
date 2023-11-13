import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/sessions/current`, { credentials: 'include' });
            const res = await response.json();
            setUser(res.user);
            return res.valid;
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
            logged,
            setLogged,
            user,
            setUser,
            getUser,
            login,
            register,
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}