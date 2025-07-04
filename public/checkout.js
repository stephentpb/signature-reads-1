const stripe = Stripe("pk_test_51RgYY8QBKtUMd8hmBvWGez2tIVXN91jcyf4kyqHEsIdXGM4L4QZoh4YJJdD4Sc2pofFXEWpQJFzSbfbodS5Xel9h00rpPDUt8S"); // replace with your actual public key

function createCheckoutSession(priceId) {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ priceId })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.id) throw new Error("No session ID returned");
      return stripe.redirectToCheckout({ sessionId: data.id });
    })
    .catch(err => console.error("Error creating checkout session:", err));
}

document.getElementById("subscribe-yearly").addEventListener("click", () => {
  createCheckoutSession("price_1RgYdaQBKtUMd8hmF0atZxZr"); // Replace with your real Stripe Price ID
});

document.getElementById("subscribe-bimonthly").addEventListener("click", () => {
  createCheckoutSession("price_1RgYdaQBKtUMd8hmQ0882Y2w"); // Replace with your real Stripe Price ID
});
