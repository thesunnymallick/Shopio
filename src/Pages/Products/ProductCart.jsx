import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ProductCart({
  name,
  id,
  desc,
  price,
  img,
  brand,
  inStock,
  grid,
  product,
}) {
  const dispatch = useDispatch();
  // cut out text
  const SortText = (text, size) => {
    if (text.length > size) {
      const newText = text.substring(0, size).concat("....");
      return newText;
    }
    return text;
  };
  // add to cart
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  return (
    <div
      className={`productCard ${
        grid ? "productCard-Grid" : "productCard-List"
      }`}
    >
      <Link to={`/productDetails/${id}`}>
        <div>
          <img src={img} alt={name} />
        </div>
      </Link>
      <div className="productCard-1">
        <span>{brand}</span>
        <h3>{SortText(name, 18)}</h3>
        <h4 className={inStock > 0 ? "success-message" : "processing-message"}>
          {`${inStock > 0 ? "inStock" : "Out Of Stock"}`}
        </h4>
        <p>{!grid && SortText(desc, 200)}</p>
        <h4>{` ₹${price}`}</h4>
        {inStock > 0 ? (
          <Button variant="contained" onClick={addToCart}>
            ADD To Cart
          </Button>
        ) : (
          <Button variant="contained" disabled>
            Not Available
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductCart;
