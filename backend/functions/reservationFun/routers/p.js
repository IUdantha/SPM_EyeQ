const express = require("express");
const stripe = require("stripe")(
  "sk_test_51O0NssHhyJDfMzjTbADGETwsDRFoz23uuo6SLQPjRZVDgfHNZlOZXiqKLYyyqOTSxyY0dbew7bG2GPBKSxugmByi00aMzSc0Qy"
);
const router = express.Router();
const mongoose = require("mongoose");

// Define a Mongoose model for payments (you should create a model that matches your data structure)
const Payment = mongoose.model("Payment", {
  tokenId: String,
  amount: Number,
  // Add other fields as needed to store payment information
});

router.post("/addP", async (req, res) => {
  try {
    const stripePayment = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });

    // Save payment information to your MongoDB database using Promises
    const paymentData = new Payment({
      tokenId: req.body.tokenId,
      amount: req.body.amount,
      // Add other fields as needed
    });

    paymentData
      .save()
      .then(() => {
        res.status(200).json({
          message: "Payment successful",
          payment: stripePayment,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed to save payment to the database",
          error: err.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "Payment failed. Please try again",
      error: error.message,
    });
  }
});

module.exports = router;
