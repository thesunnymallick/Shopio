
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";
import Loader from "../../Components/Loader/Loader";
import PaginationComponet from "../../Components/PaginationComponet/PaginationComponet";
import "./orderHistory.scss";

function OrderHistory() {
  const { data, isLoading } = useFetchCollection("orders");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { OrderItems } = useSelector((state) => state.orders);
  const { userId } = useSelector((state) => state.auth);

  const FilterOrders = OrderItems.filter((item) => item.userId === userId);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const IndexOfLastProduct = currentPage * perPage;
  const IndexOfFirstProduct = IndexOfLastProduct - perPage;
  const CurrentOrders = FilterOrders.slice(
    IndexOfFirstProduct,
    IndexOfLastProduct
  );

  // Save order in Redux
  useEffect(() => {
    dispatch({
      type: "SAVE_ORDERS",
      payload: data,
    });
  }, [data, dispatch]);

  const redirectOrderDetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <>
      {FilterOrders.length === 0 ? (
        <CustomComponents
          heading={"NO ORDER FOUND"}
          pera={"Click below button and  go to shop"}
          url={"/products"}
          btnText={"go to shop"}
        />
      ) : (
        <div className="orderHistory">
          {isLoading ? (
            <Loader />
          ) : (
            <section>
              <h1>Order history</h1>
              <p>Click view button and go to order details Page</p>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Track Order</th>
                  </tr>
                </thead>
                <tbody>
                  {CurrentOrders.map((item) => {
                    const {
                      id,
                      orderAmount,
                      orderDate,
                      orderStatus,
                      paymentMethod,
                    } = item;
                    return (
                      <tr key={id} >
                        <td>
                          <b>{`#${id}`}</b>
                        </td>
                        <td>{orderDate}</td>
                        <td>
                          {paymentMethod === "COD" ? (
                            <span>Cash</span>
                          ) : (
                            <span className="success-message"> Paid </span>
                          )}
                        </td>
                        <td>{`₹ ${orderAmount}`}</td>
                        <td>
                          {orderStatus === "Delivered" ? (
                            <span className="success-message">
                              {orderStatus}
                            </span>
                          ) : (
                            <span className="processing-message">
                              {orderStatus}
                            </span>
                          )}
                        </td>
                        <td>
                        <button onClick={() => redirectOrderDetails(id)} >View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
          {FilterOrders.length >= perPage ? (
            <PaginationComponet
              setCurrentPage={setCurrentPage}
              perPage={perPage}
              totalProducts={FilterOrders.length}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default OrderHistory;
