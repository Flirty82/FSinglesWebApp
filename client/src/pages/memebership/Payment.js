export default function Payment() {
    const userId = localStorage.getItem('userId');

    const handlePaymentSuccess = async () => {
        await axios.put('/api/users/${userId', { membership: 'paid' };
        alert('Payment successful!');
        window.location.href = '/profile';

    };

    return (
        <div className="p-6 max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Complete Your Membership</h2>
            <p className="mb-4">Click below to simulate a payment success (replace with my
                PayPal later).
            </p>
            <button onClick={handelPaymentSuccess} className="bg-green-600 text-white px-6 py-3 rounded">
                Simulate Payment Success
            </button>
        </div>
    );
}