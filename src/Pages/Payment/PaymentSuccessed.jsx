import React from "react";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";

function PaymentSuccessed() {
  return (
    <CustomComponents
      heading={"Order Successfull"}
      pera={
        "Thank you for your purchase , click button below and go order history"
      }
      url={"/order-history"}
      btnText={"View Order Status"}
    />
  );
}

export default PaymentSuccessed;
