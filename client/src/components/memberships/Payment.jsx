import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const membership = state?.membership || { name: 'Unknown', price: 0 };

    const handleApprove = (details) => {
        console.log('Payment Approved:', details);
        // After payment, go to profile setup
        navigate('/profile-setup');
    };

    return (
        <div>
            <h2>Pay for {membership.name} Membership</h2>
            <p>Amount: ${membership.price}</p>

            <PayPalScriptProvider options={{ "client-id": "AXkKFn4n5aSKD1y9LAEfkNW4zYb6autW3T8IgFUM1OdkXSkz0In77LoOe_ApqJM9WNgbIQsnJv" }}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: `${membership.name} Membership`,
                                    amount: { value: membership.price.toString() }
                                }
                            ]
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        handleApprove(details);
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}

