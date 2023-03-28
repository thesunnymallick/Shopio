import { Button } from "@mui/material";
import React from "react";
import notFound from "../../images/notfound.gif";
import { BsArrowBarLeft } from "react-icons/bs";
import "./notfound.scss";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="notfound">
      <div>
        <h1>404</h1>
        <img src={notFound} alt="Not Found" />
        <div>
          <h2>Looks Like you're Lost</h2>
          <p>This page looking are not available</p>
          <Link to="/">
            {" "}
            <Button variant="contained">
              {" "}
              <BsArrowBarLeft /> Back To Home{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
