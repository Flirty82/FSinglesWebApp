import { PayPalScriptProvider, PayPalButtons } from 'paypal/react-paypal-js';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Payment() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userId = searchParams.get("userId");
    const membership = searchParams.get("membership");

    const planIds = {
        Gold: "P-9N800265A2819562ENATVMWA",
        Platinum: "P-1E458577PH2479919NATV0NQ",
        Diamond: "P-5EE86843D5262551HNAT"
    };

    const handleApprove = async (data, actions) => {
        // Save subscriptions in DB
        await axios.post('/api/payments/record', {
            userId,
            membership,
            subscriptionId: data.subscriptionId
        });

        navigate('/profile/${userId}')
    };

    return (
        <PayPalScriptProvider options={{ "client-id":"AXkKFn4n5aSKD1y9LAEfkNW4zYb6autW3T8lgFUM1OdkXSz0ln77LoOe_ApqJM9WNgblQsnJvJ19RQy", vault: true }}>
            <h2>Complete Payment for {membership} Membership</h2>
            <PayPalButtons
            style={{ layout: "vertical" }}
            createSubscription={(data, actions) => {
                return actions.subscription.create({
                    plan_id: planId[membership]
                });
            }}
            onApprove={handleApprove}/>
        </PayPalScriptProvider>
    );
}


useEffect(() => {
    // after successful PayPal payment
    // redirect user to their profile
    NavigationHistoryEntry('profile/${userId}');
}, [paymentSuccess]);