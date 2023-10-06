import React, { useLayoutEffect, useState } from 'react'
import { Grid } from './Grid'
import { Actions } from './Actions'
import { Loader } from '../Loader'

export const Products = () => {
    const [result, setResult] = useState({});
    const [loader, setLoader] = useState(false);

    useLayoutEffect(() => {
        setLoader(true)
        fetch('http://localhost:8080/api/' + window.location.search)
        .then(res => res.json())
        .then(data => setResult(data))
        .catch(error => console.error('Hubo un problema con la operación fetch: ', error))
        .finally(() => setLoader(false))
    }, [])

    return (
        <>
        {loader && <Loader/>}
        {!loader && (
            <div className="max-w-[1024px] mt-16 mb-24 mx-auto">
                <Grid result={result}/>
                <Actions result={result}/>
            </div>
        )}
        </>
    )
}
