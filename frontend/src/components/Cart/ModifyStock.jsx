import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const ModifyStock = ({pid, max, units, setCart, setSummaryLoader }) => {
    const [currentUnits, setCurrentUnits] = useState(units);

    const updateStock = (e, increment) => {
        setSummaryLoader(true);
        e.preventDefault();

        let newUnits;
        if(increment) {
            if (currentUnits >= max) {
                setSummaryLoader(false);
                return toast.error('No more stock available');
            } else {
                setCurrentUnits(currentUnits + 1);
                newUnits = currentUnits + 1;
                e.currentTarget.previousSibling.innerText++
            }
        } else {
            if (currentUnits <= 1) {
                setSummaryLoader(false);
                return toast.error('You can\'t have less than 1 unit');
            } else {
                setCurrentUnits(currentUnits - 1);
                newUnits = currentUnits - 1;
                e.currentTarget.nextSibling.innerText--
            }
        }

        fetch('http://localhost:8080/api/cart/product/' + pid, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ units: newUnits })
        })
        .then(res => res.json())
        .then(data => {
            data.status === 'success' ?
            setCart(data.payload)
            : toast.error(data.message)
        })
        .catch(e => toast.error(e))
        .finally(() => setSummaryLoader(false));
    }

    return (
        <div id="units" className="flex">
            <span onClick={(e) => updateStock(e, false)}
            className="rounded-full bg-gray-100 hover:bg-gray-200 duration-300 text-xl border aspect-square h-8 flex justify-center items-center">
                -
            </span>
            <span id="current_units" className="h-8 aspect-square flex justify-center items-center">
                {units}
            </span>
            <span onClick={(e) => updateStock(e, true)}
            className="rounded-full bg-gray-100 hover:bg-gray-200 duration-300 text-xl border aspect-square h-8 flex justify-center items-center">
                +
            </span>
        </div>
    )
}
