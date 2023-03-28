import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountryDropdown } from "react-country-region-selector";

import "./shipping.scss";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";
import { useNavigate } from "react-router-dom";

const intialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pin_code: "",
  country: "",
  phone: "",
};

function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({ ...intialAddressState });
  const [billing, setBilling] = useState({ ...intialAddressState });
  const { cartItems, cartTotalAmmount } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("");

  // Shipping address input handel
  const ShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  // Billing address input Handel
  const BillingInputChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  // Calculate Sub Total
  useEffect(() => {
    dispatch({
      type: "CALCULATE_SUBTOTAL",
      payload: cartItems,
    });
  }, [cartItems, dispatch]);

  //save shipping address and billing address in redux
  const CheckoutHandel = (e) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_CHECKOUT_SHIPPING",
      payload: shipping,
    });
    dispatch({
      type: "SAVE_CHECKOUT_BILLING",
      payload: billing,
    });

    dispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: payment,
    });

    if (payment === "COD") {
      navigate("/order-processing");
    } else {
      navigate("/payment");
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <CustomComponents
          heading="No Cart Item"
          pera="No item in your cart, click below button back to shop"
          url="/products"
          btnText="Back To Shop"
        />
      ) : (
        <form className="shipping" onSubmit={CheckoutHandel}>
          <section>
            <h1>Shipping Address</h1>
            <div className="shpping-address">
              <TextField
                id="outlined-basic"
                label="Enter your recipient name"
                fullWidth={true}
                variant="outlined"
                name="name"
                value={shipping.name}
                required
                onChange={(e) => ShippingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your address line1"
                fullWidth={true}
                variant="outlined"
                name="line1"
                value={shipping.line1}
                required
                onChange={(e) => ShippingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your address line2"
                fullWidth={true}
                variant="outlined"
                name="line2"
                value={shipping.line2}
                onChange={(e) => ShippingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your City"
                fullWidth={true}
                variant="outlined"
                name="city"
                value={shipping.city}
                required
                onChange={(e) => ShippingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your State"
                fullWidth={true}
                variant="outlined"
                name="state"
                value={shipping.state}
                required
                onChange={(e) => ShippingInputChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="Enter your pin code"
                fullWidth={true}
                variant="outlined"
                name="pin_code"
                value={shipping.pin_code}
                required
                onChange={(e) => ShippingInputChange(e)}
              />
              <CountryDropdown
                required
                className="country-dorpdown"
                valueType="short"
                value={shipping.country}
                onChange={(val) =>
                  ShippingInputChange({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="Enter your phone number"
                fullWidth={true}
                variant="outlined"
                name="phone"
                required
                value={shipping.phone}
                onChange={(e) => ShippingInputChange(e)}
              />
            </div>
            <h1>billing Address</h1>
            <div className="billing-address">
              <TextField
                id="outlined-basic"
                label="Enter your  name"
                fullWidth={true}
                variant="outlined"
                name="name"
                value={billing.name}
                required
                onChange={(e) => BillingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your address line1"
                fullWidth={true}
                variant="outlined"
                name="line1"
                value={billing.line1}
                required
                onChange={(e) => BillingInputChange(e)}
              />

              <TextField
                id="outlined-basic"
                label="Enter your phone number"
                fullWidth={true}
                variant="outlined"
                name="phone"
                value={billing.phone}
                required
                onChange={(e) => BillingInputChange(e)}
              />
            </div>
          </section>
          <aside>
            <div className="checkoutSummary">
              <h2>Your Order</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Until Price </th>
                    <th>Set price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const { id, name, cartQuantity, price } = item;
                    return (
                      <tr key={id}>
                        <td>
                          <p className="product-name">{name}</p>
                        </td>
                        <td>{cartQuantity}</td>
                        <td>{price}</td>
                        <td>{price * cartQuantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="checkoutTotal">
                <h3>Total</h3>
                <h2>{`₹ ${cartTotalAmmount.toFixed(2)}`}</h2>
              </div>

              <div>
                <div className="paymentOption">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      required
                      label="Cash On Delivery"
                    />
                    <FormControlLabel
                      value="debitCard"
                      control={<Radio />}
                      label="Debit Card"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </div>
                <div className="checkBox">
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I've read and accept the terms and conditions "
                  />
                </div>
                <div className="Checkout-btn">
                  <Button type="submit" variant="contained">
                    Palce Order
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </form>
      )}
    </>
  );
}

export default Shipping;
