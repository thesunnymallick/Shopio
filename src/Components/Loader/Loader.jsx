import React from "react";
import "./loader.scss";
import { TailSpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader">
      <TailSpin
        height="100"
        width="100"
        color="#bf4800"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
