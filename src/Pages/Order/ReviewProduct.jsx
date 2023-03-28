import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";
import Loader from "../../Components/Loader/Loader";
import StarsRating from "react-star-rate";
import { Button, TextField } from "@mui/material";
import "./reviewProduct.scss";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";

function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("products");
  const { products } = useSelector((state) => state.products);
  const { userId, userName, userEmail } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const product = products && products.find((item) => item.id === id);

  // Save products in redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
  }, [data, dispatch]);

  // add review in firebase
  const ReviewSubmit = (e) => {
    e.preventDefault();

    const Today = new Date();
    const date = Today.toLocaleDateString();
    const reviewConfig = {
      userId,
      userName,
      userEmail,
      rating,
      review,
      productId: id,
      reviewDate: date,
      CreateAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review Submit Successfull");
      setRating(0);
      setReview("");
      navigate("/review-submit");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="review-product">
          {product ? (
            <section>
              <h1>Review Product</h1>
              <div>
                <div>
                  <img src={product.uploadImg} alt={product.name} />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p>{product.brand}</p>
                </div>
              </div>
              <form onSubmit={ReviewSubmit}>
                <label>Rating</label>
                <StarsRating
                  value={rating}
                  onChange={(rate) => {
                    setRating(rate);
                  }}
                />
                <label>Review</label>
                <TextField
                  id="outlined-multiline-static"
                  label="How is the Product? 
                  what do you like? 
                  What do you hate?"
                  multiline
                  rows={4}
                  fullWidth={true}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            </section>
          ) : (
            <CustomComponents
              heading={"Product Not Found"}
              pera={"click below button and back to order History"}
              url={"/order-history"}
              btnText={"Bcak To Order History"}
            />
          )}
        </div>
      )}
    </>
  );
}

export default ReviewProduct;
