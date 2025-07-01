import React from "react";
import "./Memberships.css";

const plans = [
  {
    name: "Gold",
    price: "$10/month",
    perks: [
      "Everything in Free",
      "Upload videos",
      "Create video profile",
      "Unlimited flirts",
      "Monthly newsletter",
      "Limited chat rooms",
      "Text-only posts in feed"
    ],
    link: "https://www.paypal.com/paypalme/yourgoldlink"
  },
  {
    name: "Platinum",
    price: "$20/month",
    perks: [
      "Everything in Gold",
      "Send/receive invites",
      "All chat rooms",
      "Full activity feed access"
    ],
    link: "https://www.paypal.com/paypalme/yourplatinumlink"
  },
  {
    name: "Diamond",
    price: "$35/month",
    perks: [
      "Everything in Platinum",
      "Full access to all features",
      "First access to new features",
      "Vote on platform updates",
      "All games unlocked"
    ],
    link: "https://www.paypal.com/paypalme/yourdiamondlink"
  }
];

const Memberships = () => (
  <div className="memberships-page">
    <h1>🎖️ Choose Your Membership</h1>
    <div className="plan-grid">
      {plans.map((plan) => (
        <div key={plan.name} className={`plan-card ${plan.name.toLowerCase()}`}>
          <h2>{plan.name}</h2>
          <p>{plan.price}</p>
          <ul>
            {plan.perks.map((perk, i) => <li key={i}>✅ {perk}</li>)}
          </ul>
          <a href={plan.link} target="_blank" rel="noopener noreferrer">Upgrade Now</a>
        </div>
      ))}
    </div>
  </div>
);

export default Memberships;
