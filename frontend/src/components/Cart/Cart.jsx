import { useContext, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LoginContext } from '../../contexts/LoginContext';
import { Product } from './Products';
import { Summary } from './Summary';
import { Loader } from '../Loader';

export const Cart = () => {
    const [cart, setCart] = useState({})
    const [loader, setLoader] = useState(false)
    const [summaryLoader, setSummaryLoader] = useState(false)
    const { user } = useContext(LoginContext);
    useLayoutEffect(() => {
        setLoader(true);
        setSummaryLoader(true);

        fetch('http://localhost:8080/api/cart', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setCart(data.payload))
        .catch(err => toast.error(err))
        .finally(() => {
            setSummaryLoader(false);
            setLoader(false);
        })
    }, [])

    return (
        <div className="max-w-[1024px] py-4 mx-auto mt-16 mb-24">
            <h1 className="text-xl mb-8">
                {user?.first_name || 'Guest'}'s cart
            </h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 flex flex-col gap-4">
                    {loader && <Loader/>}
                    {cart?.products?.length === 0 && (
                        <div className="border rounded-lg p-8">
                            <h2 className="text-2xl text-center text-gray-400">
                            Your cart is empty
                            </h2>
                        </div>
                    )}
                    <Product products={cart?.products} setCart={setCart} setSummaryLoader={setSummaryLoader}/>
                </div>
                <Summary cart={cart} summaryLoader={summaryLoader} />
            </div>
        </div>
    )
}
