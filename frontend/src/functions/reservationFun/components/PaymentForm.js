import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom"; // Import useHistory
import paymentImage from "./IM.png";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const result = await stripe.createToken(cardElement);
      if (result.error) {
        setPaymentError(result.error.message);
      } else {
        const response = await fetch("http://localhost:5000/payment/addP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId: result.token.id,
            amount: 3000, // Replace with your desired amount
          }),
        });

        history.push("/success");
        const data = await response.json();

        if (data.paymentIntent) {
          setPaymentSuccess(true);
          console.log("Payment successful!");

          history.push("/success");

          // Display an alert message when payment is successful
        }
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700">
          Card Details
        </label>
        <div className="p-2 border rounded shadow-md" id="card-element">
          <CardElement className="p-2" />
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
      >
        Pay
      </button>
      <img
        src={paymentImage} // Replace with the actual path to your image
        alt="Payment Image"
        className="mt-4 mx-auto" // You can adjust the classes as needed for styling
      />
      {paymentError && <div className="text-red-500 mt-4">{paymentError}</div>}
      {paymentSuccess && (
        <div className="text-green-500 mt-4">Payment successful!</div>
      )}
    </div>
  );
};

export default PaymentForm;
