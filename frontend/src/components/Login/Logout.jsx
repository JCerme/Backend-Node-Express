import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';

export const Logout = () => {
    const navigate = useNavigate();
    const { setLogged, setToken } = useContext(LoginContext);

    setLogged(false);
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
}
