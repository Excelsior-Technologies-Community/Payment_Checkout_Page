const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

const stripe = Stripe("sk_test_51Sac6LIRqM91NTozQHzjOAaO9V4sgSC6pBES4gQtP1f0X2FGAkJCO3ixFqE8hJLkIj2AwbQJJQlVXCnABtsYTpSn003tWfMlMv");

app.options("/create-payment-intent", cors()); // <— FIX preflight request

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));