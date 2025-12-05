import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(""); // <-- amount input
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { data } = await axios.post("http://localhost:3000/create-payment-intent", {
        amount: Number(amount),
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Payment Checkout
        </h2>

        {success ? (
          <div className="text-center text-green-600 text-lg font-medium">
            🎉 Payment Successful!
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-4">

            {/* Amount Input */}
            <div>
              <label className="text-gray-700 font-medium">Enter Amount (₹)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Enter amount (e.g. 500)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Card Element Container */}
            <div className="border border-gray-300 p-3 rounded-md bg-gray-50">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#a0aec0" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}

            {/* Pay Button */}
            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full py-3 rounded-md text-white font-medium transition 
                ${loading || !stripe ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}
              `}
            >
              {loading ? "Processing..." : `Pay ₹${amount || 0}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
