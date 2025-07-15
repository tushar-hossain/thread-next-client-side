import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  <Helmet>
    <title>Payment</title>
  </Helmet>;
  return (
    <div className="my-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
