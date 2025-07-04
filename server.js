const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{
    price: req.body.priceId, // or hardcoded
    quantity: 1,
  }],
  success_url: `${YOUR_DOMAIN}/success.html`,
  cancel_url: `${YOUR_DOMAIN}/cancel.html`,

  // ✅ Add these fields:
  shipping_address_collection: {
    allowed_countries: ['US'], // or add more countries
  },
  customer_creation: 'always',
  customer_email: req.body.email, // optional: prefill email
  metadata: {
    order_source: 'checkout_page'
  }
});


    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
