import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { CiCircleRemove } from "react-icons/ci";
import { Button } from "@mui/material";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, cartTotalAmmount, cartTotalQuantity } = useSelector(
    (state) => state.cart
  );
  const { isAuthauthenticate } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PreviousUrl = window.location.href;

  // increse Quantity
  const IncreseQuntity = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };
  //  decrese Quantity
  const DecreseQuntity = (item) => {
    dispatch({
      type: "DECRESE_QUANTITY",
      payload: item,
    });
  };
  // Remove item form cart
  const RemoveCartItem = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };
  // clear Cart
  const ClearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  // Calculate SubTotal
  useEffect(() => {
    dispatch({
      type: "CALCULATE_SUBTOTAL",
      payload: cartItems,
    });
    dispatch({
      type: "SAVE_PERVIOUS_URL",
      payload: "",
    });
  }, [cartItems, dispatch]);

  const CheckOut = () => {
    if (isAuthauthenticate) {
      navigate("/shipping");
    } else {
      dispatch({
        type: "SAVE_PERVIOUS_URL",
        payload: PreviousUrl,
      });
      navigate("/login");
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <CustomComponents
          heading={"Empty Cart"}
          pera={"Click below button and go to product page."}
          url={"/products"}
          btnText={"Go To Product"}
        />
      ) : (
        <div className="cart">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <thead>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product-info">
                      <img src={item.uploadImg} alt={item.name} />
                      <div>
                        <span>{item.brand}</span>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="cart-product-price">{` ₹ ${item.price}`}</td>
                  <td>
                    <div className="cart-quantity">
                      <button
                        onClick={() => DecreseQuntity(item)}
                        className="decrese-button"
                      >
                        -
                      </button>
                      <p>
                        <b>{item.cartQuantity}</b>
                      </p>
                      <button onClick={() => IncreseQuntity(item)}>+</button>
                    </div>
                  </td>
                  <td className="cart-total-price">{` ₹ ${(
                    item.price * item.cartQuantity
                  ).toFixed(2)}`}</td>
                  <td className="cart-delete-icon">
                    <CiCircleRemove onClick={() => RemoveCartItem(item)} />
                  </td>
                </tr>
              ))}
            </thead>
          </table>
          <div className="clearCart">
            <Button variant="contained" onClick={ClearCart}>
              Clear ALL
            </Button>
          </div>
          <div className="cart-subtotal">
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Cart Items </b>
                  </td>
                  <td className="total-quantity">{cartTotalQuantity}</td>
                </tr>
                <tr>
                  <td>
                    <b>Sub Total</b>
                  </td>
                  <td className="subTotal">{`₹ ${cartTotalAmmount.toFixed(
                    2
                  )}`}</td>
                </tr>
                <tr className="subtotal-button"></tr>
              </tbody>
            </table>
          </div>
          <div className="subtotal-button">
            <div>
              <Button variant="contained" onClick={CheckOut}>
                CheckOut
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
