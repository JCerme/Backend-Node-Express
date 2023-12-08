import { useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const { getUser } = useContext(LoginContext)
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const data = await getUser();
            if (!data?.valid) navigate('/login');
        })()
    }, [])

    return (
        <div className='private-root'>
            <Header />
            {children}
        </div>
    )
}
