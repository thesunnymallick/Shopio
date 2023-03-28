import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../Components/CustomHooks/useFetchDocument";
import Loader from "../../Components/Loader/Loader";

import "./adminOrderDetails.scss";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toast } from "react-toastify";
function AdminOrderDetails() {
  const steps = ["Placed", "Picked", "Packed", "Shipped", "Delivered"];

  const { id } = useParams();

  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.auth);
  const { document, isLoading } = useFetchDocument("orders", id);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Update Status");

  useEffect(() => {
    setOrder(document);
  }, [document]);
 
  // Order Status Change function
  const ChangeOrderStatus = (e) => {
    e.preventDefault();
  

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      paymentMethod: order.paymentMethod,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      CreateAt: order.CreateAt,
      EditedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order Status Change SucessFull");
      navigate("/admin/vieworder");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {order === null ? (
        <h1>No Order Found</h1>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="OrderDetails">
              <div className="orderDetails-1">
                <h1>Order#{id}</h1>
                <p>
                  {order.orderDate} at {order.orderTime}
                </p>
              </div>
              <div className="orderDetails-2">
                <section>
                  <div>
                    <h1>Ordered Items</h1>
                  </div>

                  <table>
                    <tr>
                      <th>items</th>
                      <th className="itemDetails-Quantity">Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>

                    <tbody>
                      {order.cartItems &&
                        order.cartItems.map((item) => {
                          const {
                            brand,
                            cartQuantity,
                            id,
                            name,
                            price,
                            uploadImg,
                          } = item;

                          return (
                            <tr key={id}>
                              <td>
                                <div className="itemDetails">
                                  <div>
                                    <img src={uploadImg} alt={name} />
                                  </div>
                                  <div>
                                    <h4>{name}</h4>
                                    <h5>{brand}</h5>
                                    <h5>{id}</h5>
                                  </div>
                                </div>
                              </td>
                              <td className="itemDetails-Quantity">
                                {cartQuantity}
                              </td>
                              <td>
                                <div className="itemsDetails-quantity">
                                  <p>{price}</p> x <p>{cartQuantity}</p>
                                </div>
                              </td>
                              <td>
                                <p className="itemsDetails-quantity-price">
                                  {" "}
                                  <b>{`₹ ${price * cartQuantity}`}</b>{" "}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </section>

                <article>
                  <div>
                    <h1>Change Order Status</h1>
                  </div>
                  <section>
                    <form onSubmit={ChangeOrderStatus}>
                      <select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        fullWidth={true}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {steps.map((i, index) => (
                          <option key={index} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>

                      <Button type="submit" variant="contained">
                        Submit{" "}
                      </Button>
                    </form>
                  </section>
                </article>
              </div>

              <div className="orderDetails-3">
                <h1>Shipping Details</h1>
                <section>
                  <div>
                    <h5>{userName}</h5>
                    <h5>{order.userEmail}</h5>
                    <h5>
                      {order.shippingAddress ? order.shippingAddress.phone : ""}
                    </h5>
                  </div>
                  <div>
                    <h6>
                      {order.shippingAddress ? order.shippingAddress.line1 : ""}
                    </h6>
                    <h6>
                      {order.shippingAddress ? order.shippingAddress.line2 : ""}
                    </h6>
                    <h6>
                      <p>
                        {order.shippingAddress
                          ? order.shippingAddress.city
                          : ""}
                      </p>
                      <p>
                        {order.shippingAddress
                          ? order.shippingAddress.state
                          : ""}
                      </p>
                      <p>
                        {order.shippingAddress
                          ? order.shippingAddress.pin_code
                          : ""}
                      </p>
                    </h6>
                    <h6>
                      {order.shippingAddress
                        ? order.shippingAddress.country
                        : ""}
                    </h6>
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AdminOrderDetails;
