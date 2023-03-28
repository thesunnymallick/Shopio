import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentFrom from "./PaymentFrom";
import {motion} from 'framer-motion'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function Payment() {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const [message, setmessage] = useState("Initialize Checkout...");

  const { userEmail } = useSelector((state) => state.auth);
  const { cartItems, cartTotalAmmount } = useSelector((state) => state.cart);

  const description = `shop.io payment: Email: ${userEmail} Amount : ${cartTotalAmmount}`;

  useEffect(() => {
    dispatch({
      type: "CALCULATE_SUBTOTAL",
      payload: cartItems,
    });
  }, [cartItems, dispatch]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    //http://localhost:4242/create-payment-intent
    //
    fetch("https://shopio-api.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail,
        cartTotalAmmount,
        description,
      }),
    })
      //Problem---
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setmessage("Failed To Initialize Checkout");
        toast.error("Something Worng !");
      });
  }, [cartItems, dispatch, userEmail, description, cartTotalAmmount]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const loading={
    transition:{
      ease:"linear",
      repeat:"Infinity",
      repeatType:"reverse"
    }
  }
  

  return (
    <>
     {
      !clientSecret &&
       <div className="payment-error" style={{width:"100%", height:"100vh",
       display:"flex", alignItems:"center", justifyContent:"center"}}>
        {!clientSecret && <motion.h3 {...loading}>{message}</motion.h3>}</div>
     }
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentFrom />
        </Elements>
      )}
    </>
  );
}

export default Payment;
