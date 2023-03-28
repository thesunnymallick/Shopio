import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";

function OrderProcessing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotalAmmount } = useSelector((state) => state.cart);
  const { userEmail, userId } = useSelector((state) => state.auth);
  const { shippingAddress, billingAddress, paymentMethod } = useSelector(
    (state) => state.checkout
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useFetchCollection("products");
  const { products } = useSelector((state) => state.products);

  // Products Save In redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
  }, [dispatch, data]);
  
  // Upadte Stock
  const updateStock = (id, quantity) => {
    const FindProduct = products.find((item) => item.id === id);
    const newStock = FindProduct.inStock - quantity;

    try {
      setDoc(doc(db, "products", id), {
        name: FindProduct.name,
        price: Number(FindProduct.price),
        category: FindProduct.category,
        brand: FindProduct.brand,
        inStock: Number(newStock),
        des: FindProduct.des,
        uploadImg: FindProduct.uploadImg,
        CreateAt: FindProduct.CreateAt,
        EditedAt: Timestamp.now().toDate(),
      });

      toast.success("Stock update successfull.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // order save in firebase
  const OrderSave = () => {
    setIsLoading(true);
    const Today = new Date();
    const date = Today.toLocaleDateString();
    const time = Today.toLocaleTimeString();

    cartItems.map((item) => {
      const { id, cartQuantity } = item;
      return updateStock(id, cartQuantity);
    });

    const orderConfig = {
      userId,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmmount,
      orderStatus: "Placed",
      paymentMethod,
      cartItems,
      shippingAddress,
      billingAddress,
      CreateAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      navigate("/order-success");
      toast.success("Order Sucessfully Done", { position: "top-left" });

      dispatch({
        type: "CLEAR_CART",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div id="CustomComponents">
          <div>
            <h1>Confirm Order</h1>
            <p>Click button and confirm your Order</p>
            <Button onClick={OrderSave} variant="contained">
              Order Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderProcessing;
