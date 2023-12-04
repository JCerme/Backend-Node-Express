const token = localStorage.getItem('token');

export default class PaymentService {
    createPaymentIntent = ({ callbackSuccess, callbackError }) => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/stripe/payment-intents`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => callbackSuccess(data))
        .catch(error => callbackError(error));
    }
}