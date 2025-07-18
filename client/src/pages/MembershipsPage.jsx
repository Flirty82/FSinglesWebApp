export default function Membership() {
    return (
        <div className="max-w-3xl mx-auto mt-12 text-center">
            <h2 className="grid grid-cols-1 m:grid-cols-2 gap-6">
                {[
                    { name: "Free", price: "$0/mo", features: ["24/7 support", "unlimited messaging",
                        "browse other singles", "chat rooms limited access", "and much more"
                    ]},
                    { name: "Gold", price: "$25/mo", features: ["Features from free membership",
                        "unlimited flirts", "monthly newsletter", "music feature", "view activity feed",
                        "upload/share videos", "video profiles"
                    ]},
                    { name: "Platinum", price: "$35/mo", features: ["Features from free & gold memberships",
                        "yearly newsletter", "unlocks all chat rooms", "create new chat rooms & topics", "unlimited invites", 
                        "unlimited access to activity feed"
                    ]},
                    { name: "Diamond", price: "$55/mo", features: ["Features from free, gold, & platinum memberships",
                        "full unlimited access to all features!", "first access to new features before they hit the app or website",
                        "full feedback feature", "unlocks virtual dating", "and more!"
                    ]},
                ].map((plan) => (
                    <div key={plan.name} className="border p-4 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-lg font-semibold mb-2">{plan.price}</p>
                        <ul className="text-left mb-1">
                            {plan.features.map((f, idx) => (
                                <li key={idx}>{f}</li>
                            ))}
                        </ul>
                        <form action={'https://www.flirtingsingles.blog/paypal'} method="POST">
                          <input type="hidden" name="cmd" value="_s-xclick"/>
                          <input type="hidden" name="hosted_button_id" value="P-3RG36489BX4272622NAQCKEA"/>
                          <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded mt-2">Purchase with PayPal</button>
                        </form>
                    </div>
                ))}
            </h2>
        </div>
    );
}