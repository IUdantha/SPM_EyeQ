import React, { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import paymentImage from "./image.png";

const CheckoutForm = () => {
  const stripe = useStripe();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = stripe(
      "pk_test_51O0NssHhyJDfMzjT9pK9dknRwufzfnLkan6hoqxeunhaxnZ8QCbYwP6q5PyV7ZPHnocwrMvwCnVJZ3eAAYm1YfBW00C2rKQaZn"
    ); // Replace with your Stripe public key

    try {
      const response = await fetch("http://localhost:5000/payment/addP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // Replace with your desired amount
          currency: "usd", // Replace with your desired currency
        }),
      });

      const data = await response.json();

      const { clientSecret } = data;

      const elements = stripe.elements();
      const cardElement = elements.create("card");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        // You can handle success actions here
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id="card-element">
          {/* Stripe Card Element will be inserted here */}
        </div>

        <button type="submit">Pay</button>

        {paymentError && <div>{paymentError}</div>}
        {paymentSuccess && <div>Payment successful!</div>}

        <img
          src={paymentImage} // Replace with the actual path to your image
          alt="Payment Image"
          className="mt-4 mx-auto" // You can adjust the classes as needed for styling
        />
      </form>
    </>
  );
};

export default CheckoutForm;
