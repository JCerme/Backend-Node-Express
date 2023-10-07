import React, { useEffect, useState } from 'react'

export const Mocking = () => {
    const [mocking, setMocking] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/api/mockingproducts')
        .then(res => res.json())
        .then(data => setMocking(data))
        .catch(error => setMocking('Hubo un problema con la operación fetch: ' + error))
    }, [])

    return (
        <div className="max-w-[1024px] mt-16 mb-24 mx-auto">
            <div className="grid grid-cols-3 gap-12">
                {mocking.map(prod => (
                    <a href={'/product/' + prod._id} key={prod._id}
                    className={"product relative p-4 hover:shadow-lg border rounded-lg duration-300 overflow-hidden" + (prod.stock ? '' : ' opacity-50')}>
                        {!prod.stock && (
                            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-red-600 w-[200%] text-white rotate-45 text-center p-2">
                                OUT OF STOCK
                            </div>
                        )}
                        <div className="mb-3">
                            <img 
                                className="w-full rounded-lg"
                                src={prod.thumbnail}
                                alt="product image"/>
                        </div>
                        <div className="product-info">
                            <h2 className="text-2xl ">
                                {prod.title}
                            </h2>
                            <p className="text-gray-400 leading-5 line-clamp-3">
                                {prod.description}
                            </p>
                            <button className="rounded bg-blue-600 hover:bg-blue-400 duration-500 text-white font-bold mt-4 w-full p-2">
                                {`${prod.price}/day`}
                            </button>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
