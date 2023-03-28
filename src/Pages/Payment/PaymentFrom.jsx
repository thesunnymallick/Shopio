import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import "./paymentForm.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useSelector, useDispatch } from "react-redux";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";
function PaymentFrom() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useFetchCollection("products");

  const { userEmail, userId } = useSelector((state) => state.auth);
  const { cartItems, cartTotalAmmount } = useSelector((state) => state.cart);
  const { shippingAddress, billingAddress, paymentMethod } = useSelector(
    (state) => state.checkout
  );
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  // Products Save In redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
  }, [dispatch, data]);

  // Upadte stock
  const updateStock = (id, quantity) => {
    const FindProduct = products.find((item) => item.id === id);
    const newStock = FindProduct.inStock - quantity;

    try {
      setDoc(doc(db, "products", id), {
        name: FindProduct.name,
        price: Number(FindProduct.price),
        category: FindProduct.category,
        brand: FindProduct.brand,
        inStock: Number(newStock),
        des: FindProduct.des,
        uploadImg: FindProduct.uploadImg,
        CreateAt: FindProduct.CreateAt,
        EditedAt: Timestamp.now().toDate(),
      });

      toast.success("Stock update successfull.");
    } catch (error) {
      toast.error(error.message);
    }
  };
 // Order Save in redux
  const OrderSave = () => {
    cartItems.map((item) => {
      const { id, cartQuantity } = item;
      return updateStock(id, cartQuantity);
    });
    const Today = new Date();
    const date = Today.toLocaleDateString();
    const time = Today.toLocaleTimeString();

    const orderConfig = {
      userId,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmmount,
      orderStatus: "Placed",
      paymentMethod,
      cartItems,
      shippingAddress,
      billingAddress,
      CreateAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      toast.success("Order Sucessfully Done", { position: "top-left" });
      dispatch({
        type: "CLEAR_CART",
      });
      navigate("/order-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    setMessage(null);
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: "http://localhost:3000/order-success",
      // },
      redirect: "if_required",
    });
    if (result.error) {
      // Bad payment
      toast.error(result.error.message);
      setMessage(result.error.message);
      return;
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setIsLoading(false);
        toast.success("payment Successful");
        OrderSave();
      } else {
        toast.error("There is some isuuu while processing payment");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="paymentForm">
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement
            id="link-authentication-element"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <Button
            variant="contained"
            disabled={isLoading || !stripe || !elements}
            type="submit"
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner">
                  {" "}
                </div>
              ) : (
                "Pay now"
              )}
            </span>
          </Button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </>
  );
}

export default PaymentFrom;
