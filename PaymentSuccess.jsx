import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccess() {
    const navigate = useNavigate();
}

useEffect(() => {
    const subscriptionId = new URLSearchParams(window.location.search).get('subscription_id');

    axios.post('/api/paypal/verify', { subscriptionId })
    .then((res) => {
        navigate('/profile/${res.data.userId}');
    })
    .catch (() => {
        alert('Payment verification failed. Please try again.');
        navigate('/register');
    });
}, []);

return (
    <div>
        <h1>Payment Successful</h1>
        <p>Your payment has been successfully processed.</p>
    </div>
)