import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const payAmount = 10;

  const amount = 10 * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
      setProcessing(false);
    } else {
      console.log(paymentMethod);

      const { data } = await axiosSecure.post(`/create-payment-intent`, {
        amount,
      });

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret,
        { payment_method: paymentMethod.id }
      );

      if (error) {
        setProcessing(false);
        setPaymentError(error?.message);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const paymentData = {
          email: user?.email,
          name: user?.displayName,
          amount,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          status: "succeeded",
        };

        const { data } = await axiosSecure.post(`/payments`, paymentData);

        if (data.insertedId) {
          toast.success("Payment Successful!");
          navigate("/");
        }
        console.log(data);
      }

      setPaymentError(null);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-base-300 p-3 rounded-lg">
      <form onSubmit={handleSubmit}>
        <CardElement />
        {paymentError && (
          <p className="text-red-500 mb-2 text-sm">{paymentError}</p>
        )}
        <button
          type="submit"
          className="btn btn-black w-full"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${payAmount}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
