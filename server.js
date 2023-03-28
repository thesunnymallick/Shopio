require("dotenv").config();
const express = require("express");
const app = express();
const cors=require("cors")

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.use(cors())
app.use(express.json());

app.get("/", (req, res)=>{
 res.send("Welcome to shopio website")

})

const calculateOrderAmount = (amount) => {
  return amount*100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { userEmail, description, cartTotalAmmount } = req.body;
  
  //Empty error
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cartTotalAmmount),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    // shipping:{
    //     address:{
    //         line1:shippingAddress.line1,
    //         line2:shippingAddress.line2,
    //         city:shippingAddress.city,
    //         state:shippingAddress.state,
    //         pin_code:shippingAddress.pin_code,
    //         country:shippingAddress.country,
    //     },
    //     name:shippingAddress.name,
    //     phone:shippingAddress.phone
    // },
    receipt_email:userEmail
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
  
const PORT=process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));