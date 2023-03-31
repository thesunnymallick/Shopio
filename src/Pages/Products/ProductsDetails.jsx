import { Badge, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import "./productDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import useFetchDocument from "../../Components/CustomHooks/useFetchDocument";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";
import user from "../../images/user.png";
import StarsRating from "react-star-rate";

function ProductsDetails() {
  const { id } = useParams();

  const { document, isLoading } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");

  const [singleProduct, setSingleProduct] = useState("");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cart = cartItems.find((item) => item.id === id);

  const reviews = data.filter((review) => review.productId === id);

  // add to cart product
  const AddToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  // increse Quantity
  const IncreseQuantity = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };
  // decrese Quantity
  const DecreseQuantity = (product) => {
    dispatch({
      type: "DECRESE_QUANTITY",
      payload: product,
    });
  };

  useEffect(() => {
    setSingleProduct(document);
  }, [document]);

  const {
    uploadImg,
    name,
    brand,
    category,
    price,
    des,
    inStock,
    id: productId,
  } = singleProduct;
  return (
    <>
      <div className="productDetails">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="productDetails-1">
              <div className="productDetails-1-1">
                <img src={uploadImg} alt={name} />
              </div>
              <div className="productDetails-1-2">
                <h1>{name}</h1>
                <h3>{` ₹${price}`}</h3>
                <h4
                  className={
                    inStock > 0 ? "success-message" : "processing-message"
                  }
                >
                  {`${inStock > 0 ? "inStock" : "Out Of Stock"}`}
                </h4>
                <p>{des}</p>
                <span>
                  Id : <p>{productId}</p>
                </span>
                <span>
                  Category : <p>{category}</p>
                </span>
                <span>
                  Brand : <p>{brand}</p>
                </span>
                {cart ? (
                  <>
                    <div>
                      {cart ? (
                        <button
                          variant="contained"
                          onClick={() => DecreseQuantity(singleProduct)}
                        >
                          -
                        </button>
                      ) : (
                        <button
                          variant="contained"
                          disabled
                          className="disible-btn"
                          onClick={() => DecreseQuantity(singleProduct)}
                        >
                          -
                        </button>
                      )}
                      <p>
                        <b>{cart ? cart.cartQuantity : 1}</b>
                      </p>
                      <button
                        variant="contained"
                        onClick={() => IncreseQuantity(singleProduct)}
                      >
                        +
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="product-btn">
                  <Link to="/products" className="btn-1">
                    <Button variant="contained">Go To Product</Button>
                  </Link>
                  <Link className="btn-2">
                    {inStock > 0 ? (
                      <Button
                        variant="contained"
                        onClick={() => AddToCart(singleProduct)}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button variant="contained" disabled>
                        Not Available
                      </Button>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="NoReviews">
          <h1>There are no reviews for this product</h1>
        </div>
      ) : (
        <div className="allReviews">
          {reviews.map((item) => {
            const { rating, review, reviewDate, userName } = item;
            return (
              <Badge badgeContent={rating} color="primary">
                <div className="reviewCard">
                  <aside>
                    <div>
                      <img src={user} alt={userName} />
                    </div>
                    <div>
                      <h4>{userName}</h4>
                      <StarsRating value={rating} />
                      <span>{reviewDate}</span>
                    </div>
                  </aside>
                  <p>{review}</p>
                </div>
              </Badge>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ProductsDetails;
