import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const StripeComponent = ({handleHide, secret, action}: any) => {
  const pubkey = import.meta.env.VITE_APP_STRIPE_PUB_KEY
  const stripe = loadStripe(pubkey);
  return (
    <Elements stripe={stripe}>
      <PaymentForm handleHide={handleHide} secret={secret} action={action}/>
    </Elements>
  );
};

export default StripeComponent;
