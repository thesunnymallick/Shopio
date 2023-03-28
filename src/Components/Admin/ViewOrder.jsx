import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomComponents from "../../Components/CustomComponents/CustomComponents";
import Loader from "../../Components/Loader/Loader";
import useFetchCollection from "../CustomHooks/useFetchCollection";
import PaginationComponet from "../PaginationComponet/PaginationComponet";
import "./viewOrder.scss";
function ViewOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCollection("orders");

  useEffect(() => {
    dispatch({
      type: "SAVE_ORDERS",
      payload: data,
    });
  }, [data, dispatch]);

  const { OrderItems } = useSelector((state) => state.orders);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const IndexOfLastProduct = currentPage * perPage;
  const IndexOfFirstProduct = IndexOfLastProduct - perPage;
  const CurrentOrders = OrderItems.slice(
    IndexOfFirstProduct,
    IndexOfLastProduct
  );

  const AdminOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {OrderItems.length !== 0 ? (
            <div className="allOrders">
              <h1>ALL ORDERS</h1>
              <p>Open an order to change order Status</p>
              <table>
                <thead>
                  <tr>
                    <th>SL/No</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>OrderID</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CurrentOrders.map((item, index) => {
                    const {
                      id,
                      orderStatus,
                      orderDate,
                      orderAmount,
                      orderTime,
                      paymentMethod,
                    } = item;
                    return (
                      <tr key={id} onClick={() => AdminOrderDetails(id)}>
                        <td>{index + 1}</td>
                        <td>{orderDate}</td>
                        <td>{orderTime}</td>

                        <td>{id}</td>
                        <td>{orderAmount}</td>
                        <td>
                          {paymentMethod === "COD" ? (
                            <p className="processing-message">CASH</p>
                          ) : (
                            <p className="success-message">PAID</p>
                          )}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus === "Delivered"
                                ? "success-message"
                                : "processing-message"
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {OrderItems.length >= perPage ? (
                <PaginationComponet
                  setCurrentPage={setCurrentPage}
                  perPage={perPage}
                  totalProducts={OrderItems.length}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <CustomComponents
            heading={"NO ORDER FOUND"}
            pera={"Click below button and  go to shop"}
            url={"/products"}
            btnText={"go to shop"}
          />
          )}
        </>
      )}
    </>
  );
}

export default ViewOrder;
