import React, { useRef, useState } from 'react'
import { Summary } from './Summary'
import { Form } from './Form'
import { Header } from '../Header'
import { Offers } from './Offers'
import { CreditCard } from './CreditCard'
import { SuccessModal } from './SuccessModal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Checkout = () => {
    const [modal, setModal] = useState(false)
    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        email: false,
        address: false,
        postalCode: false,
        city: false,
        state: false,
        country: false,
        policy: false,
    })
    let nameRef = useRef(null)
    let lastNameRef = useRef(null)
    let emailRef = useRef(null)
    let addressRef = useRef(null)
    let postalCodeRef = useRef(null)
    let cityRef = useRef(null)
    let stateRef = useRef(null)
    let countryRef = useRef(null)
    let policyRef = useRef(null)

    const navigate = useNavigate();

    const sendForm = (e) => {
        e.preventDefault();
        let newErrors = {...errors};

        nameRef.current.value === ''
        ? newErrors.name = 'This field is required'
        : newErrors.name = false;

        lastNameRef.current.value === ''
        ? newErrors.lastName = 'This field is required'
        : newErrors.lastName = false;

        emailRef.current.value === ''
        ? newErrors.email = 'This field is required'
        : newErrors.email = false;

        addressRef.current.value === ''
        ? newErrors.address = 'This field is required'
        : newErrors.address = false;

        postalCodeRef.current.value === ''
        ? newErrors.postalCode = 'This field is required'
        : newErrors.postalCode = false;

        cityRef.current.value === ''
        ? newErrors.city = 'This field is required'
        : newErrors.city = false;

        stateRef.current.value === ''
        ? newErrors.state = 'This field is required'
        : newErrors.state = false;

        countryRef.current.value === ''
        ? newErrors.country = 'This field is required'
        : newErrors.country = false;

        policyRef.current.checked === false
        ? newErrors.policy = 'You must accept the terms and conditions'
        : newErrors.policy = false;

        setErrors(newErrors);
        if(Object.values(newErrors).some(value => value !== false)) return;

        fetch('http://localhost:8080/api/checkout', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                toast.success('Your purchase was successful!');
                navigate('/');
            } else {
                toast.error(data.payload.message);
            }
        })
        .catch(err => toast.error(err));
    }

    return (
        <>
        <div className='max-w-[1024px] mx-auto'>
            <h2 className='my-16 relative uppercase font-light italic text-blue-500 text-center text-3xl'>
                "Just one step more to live a new adventure"
                <span className='w-full text-center uppercase opacity-10 text-blue-500 text-6xl font-bold absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                new adventure
                </span>
            </h2>
            <form onSubmit={sendForm}
            className='grid grid-cols-5 gap-12 mb-28 items-start'>
                <div className='col-span-3 flex flex-col gap-6'>
                    <Form
                        nameRef={nameRef}
                        lastNameRef={lastNameRef}
                        emailRef={emailRef}
                        addressRef={addressRef}
                        postalCodeRef={postalCodeRef}
                        cityRef={cityRef}
                        stateRef={stateRef}
                        countryRef={countryRef}
                        errors={errors}
                    />
                    <CreditCard/>
                </div>
                <div className='sticky top-24 col-span-2 flex flex-col gap-6'>
                    <Summary policyRef={policyRef} errors={errors}/>
                    {/* <Offers/> */}
                </div>
            </form>
            {modal && <SuccessModal state={modal} setModal={setModal}/>}
        </div>
        </>
    )
}
