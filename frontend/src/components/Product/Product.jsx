import { useLayoutEffect, useState } from 'react'
import { Cards } from './Cards'
import { Info } from './Info'
import { Image } from './Image'
import { Loader } from '../Loader'

export const Product = () => {
    const [product, setProduct] = useState({})
    const [loader, setLoader] = useState(false)

    useLayoutEffect(() => {
        setLoader(true)
        fetch('http://localhost:8080/api/products/' + window.location.pathname.split('/').pop(), {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setProduct(data.payload[0]))
        .catch(error => console.error('Hubo un problema con la operación fetch: ', error))
        .finally(() => setLoader(false))
    }, [])

    // const socket = io();
    // const cartId = document.querySelector('#cart_id').value;
    // document.querySelector('#addToCart').addEventListener('click', (e) => {
    //     socket.emit('addToCart', {
    //         pid: e.target.dataset.id,
    //         cid: cartId,
    //     })
    // })

    // socket.on('productAddedToCart', () => {
    //     createToast("success", "Product added successfully to cart");
    // })

    return (
        <>
        {loader && <Loader/>}
        {!loader && (
            <div className="max-w-[1024px] mx-auto grid grid-cols-2 gap-12 pt-12">
                <div className="image-sect relative">
                    <Image product={product} />
                    <Cards />
                </div>
                <div className="content">
                    <Info product={product} />
                </div>
            </div>
        )}
        </>
    )
}
