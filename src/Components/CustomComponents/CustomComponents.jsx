import { Button } from "@mui/material";
import React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function CustomComponents({ heading, pera, url, btnText }) {
  return (
    <div id="CustomComponents">
      <div>
        <h1>{heading}</h1>
        <p>{pera}</p>
        <Link to={url}>
          <Button variant="contained">
            <BsArrowBarLeft />
            {btnText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CustomComponents;
