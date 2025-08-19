import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { FaCreditCard } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
  return (
    <div className="my-12 px-4">
      <Helmet>
        <title>Payment | ThreadNest</title>
      </Helmet>

      {/* Container */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <FaCreditCard className="w-12 h-12 mx-auto text-sky-500 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">Secure Payment</h1>
          <p className="text-slate-500">
            Enter your card details below to complete your payment.
          </p>
        </div>

        {/* Stripe Checkout Form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        {/* Test Card Info */}
        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <h2 className="text-slate-700 font-semibold mb-2">
            💳 Test Card Numbers
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Use these cards for testing payments. Do not use real card info.
          </p>

          <div className="space-y-3">
            <div>
              <p className="font-mono text-slate-800">4242 4242 4242 4242</p>
              <p className="text-xs text-slate-500">Visa – Always succeeds</p>
            </div>
            <div>
              <p className="font-mono text-slate-800">5555 5555 5555 4444</p>
              <p className="text-xs text-slate-500">
                Mastercard – Always succeeds
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Exp: <span className="font-mono">12 / 34</span> &nbsp; CVC:{" "}
            <span className="font-mono">123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
