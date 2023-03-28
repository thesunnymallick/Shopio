import React from "react";
import { Link } from "react-router-dom";

const PopularCard = ({ id, name, brand, img, price, inStock }) => {
  // Cut out text
  const SortText = (text, size) => {
    if (text.length > size) {
      const newText = text.substring(0, size).concat("....");
      return newText;
    }
    return text;
  };
  return (
    <Link to={`/productDetails/${id}`}>
      <div className="popular-card">
        <aside>
          <img src={img} alt={name} />
        </aside>
        <div>
          <span>{brand}</span>
          <h5
            className={inStock > 0 ? "success-message" : "processing-message'"}
          >
            {`${inStock > 0 ? "inStock" : "Out Of Stock"}`}
          </h5>
          <h3>{SortText(name, 18)}</h3>

          <h4>{`₹ ${price}`}</h4>
        </div>
      </div>
    </Link>
  );
};

export default PopularCard;
