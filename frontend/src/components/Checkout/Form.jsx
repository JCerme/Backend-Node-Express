import React, { useContext, useRef, useState } from 'react'
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { CustomerForm } from './CustomerForm'
import { CardElement } from '@stripe/react-stripe-js'
import { Summary } from './Summary'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../../contexts/LoginContext';
// import { Offers } from './Offers';

export const Form = ({ paymentIntentId }) => {
    const { token } = useContext(LoginContext);
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
    let btnRef = useRef(null)

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const sendForm = async (e) => {
        e.preventDefault();
        btnRef.current.disabled = true;
        let newErrors = {...errors};

        const fields = [
            { ref: nameRef, key: 'name', errorMessage: 'This field is required' },
            { ref: lastNameRef, key: 'lastName', errorMessage: 'This field is required' },
            { ref: emailRef, key: 'email', errorMessage: 'This field is required' },
            { ref: addressRef, key: 'address', errorMessage: 'This field is required' },
            { ref: postalCodeRef, key: 'postalCode', errorMessage: 'This field is required' },
            { ref: cityRef, key: 'city', errorMessage: 'This field is required' },
            { ref: stateRef, key: 'state', errorMessage: 'This field is required' },
            { ref: countryRef, key: 'country', errorMessage: 'This field is required' },
            { ref: policyRef, key: 'policy', errorMessage: 'You must accept the terms and conditions', isCheckbox: true }
        ];

        fields.forEach(field => {
            if (field.isCheckbox) {
                newErrors[field.key] = !field.ref.current.checked ? field.errorMessage : false;
            } else {
                newErrors[field.key] = field.ref.current.value === '' ? field.errorMessage : false;
            }
        });

        setErrors(newErrors);
        if(Object.values(newErrors).some(value => value !== false)) return;

        if (!stripe || !elements) {
            toast.error('Stripe is not loaded');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            toast.error('Card data is not loaded');
            return;
        }

        const billingDetails = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            address: {
                line1: addressRef.current.value,
                postal_code: postalCodeRef.current.value,
                city: cityRef.current.value,
                state: stateRef.current.value,
                country: countryRef.current.value,
            },
        };

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
        });

        if (stripeError) {
            toast.error('Card data is not valid' + stripeError.message);
            return;
        }

        // Form data
        const formData = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            postalCode: postalCodeRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            country: countryRef.current.value,
            policyAccepted: policyRef.current.checked,
            paymentMethodId: paymentMethod.id,
        };

        fetch(`${import.meta.env.VITE_BASE_URL}/api/checkout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ ...formData, paymentIntentId }),
        })
        .then(response => response.json())
        .then(async data => {
            if(data.status === "success"){
                toast.success('Your purchase was successful!');
                navigate('/');
            } else {
                toast.error(data.payload.message);
            }
        })
        .catch(err => toast.error(err))
        .finally(() => btnRef.current.disabled = false)
    }

    return (
        <form onSubmit={sendForm}
        className='grid grid-cols-5 gap-12 mb-28 items-start'>
            <div className='col-span-3 flex flex-col gap-6'>
                <CustomerForm
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
            </div>
            <div className='sticky top-24 col-span-2 flex flex-col gap-6'>
                <Summary btnRef={btnRef} CardElement={CardElement} policyRef={policyRef} errors={errors}/>
                {/* <Offers/> */}
            </div>
        </form>
    )
}
