import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../Components/CustomHooks/useFetchDocument";
import Loader from "../../Components/Loader/Loader";
import "./orderDetails.scss";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { BiCheckDouble } from "react-icons/bi";
import { GiCardboardBox } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { MdLocalShipping } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";

const steps = ["Placed", "Picked", "Packed", "Shipped", "Delivered"];

function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.auth);
  const { document, isLoading } = useFetchDocument("orders", id);
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(0);
  const orderStatus = order ? order.orderStatus : "Placed";

  useEffect(() => {
    setOrder(document);

    if (orderStatus === "Placed") {
      setStep(0);
    } else if (orderStatus === "Picked") {
      setStep(1);
    } else if (orderStatus === "Packed") {
      setStep(2);
    } else if (orderStatus === "Shipped") {
      setStep(3);
    } else if (orderStatus === "Delivered") {
      setStep(4);
    }
  }, [document, orderStatus]);

  const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: "#eaeaf0",
      padding: 10,
      borderRadius: "50%",
      fontSize: 15,
    },
    active: {
      color: "red",
    },
    completed: {
      color: "green",
    },
  }));

  const CustomStepIcon = (props) => {
    const classes = useStyles();
    const { active, completed } = props;

    const stepIcons = {
      1: <BiCheckDouble />,
      2: <GiCardboardBox />,
      3: <GoPackage />,
      4: <MdLocalShipping />,
      5: <GrCompliance />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {stepIcons[String(props.icon)]}
      </div>
    );
  };

  const ReviewProduct = (id) => {
    navigate(`/product-review/${id}`);
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
                      <th>Review</th>
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
                              <td className="itemsDetails-btn">
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => ReviewProduct(id)}
                                >
                                  Review
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </section>

                <aside>
                  <div>
                    <h1>Order History</h1>
                  </div>
                  <section className="order-stepper">
                    <Stepper activeStep={step} orientation="vertical">
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel StepIconComponent={CustomStepIcon}>
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </section>
                </aside>
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

export default OrderDetails;
