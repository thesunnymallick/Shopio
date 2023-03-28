import React from "react";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";

function ReviewSubmit() {
  return (
    <CustomComponents
      heading={"Review Submit Successful"}
      pera={"Thank you! giving this review"}
      url={"/products"}
      btnText="Back to shop"
    />
  );
}

export default ReviewSubmit;
