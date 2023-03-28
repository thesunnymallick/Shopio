import React, { useEffect } from "react";
import "./dashboard.scss";
import { BiRupee } from "react-icons/bi";
import { Line, Pie } from "react-chartjs-2";
// import { chart as ChartJS } from "chart.js/auto";
// import { Chart as ChartJS, Tooltip, ArcElement, Legend, CategoryScale} from 'chart.js'
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";
import { useSelector, useDispatch } from "react-redux";
import { GiShoppingBag, GiShoppingCart } from "react-icons/gi";
import { MdOutlineReviews } from "react-icons/md";
import { Chart as ChartJS, registerables } from "chart.js"

ChartJS.register(...registerables)

function Dashboard() {
  const dispatch = useDispatch();
  const { data } = useFetchCollection("products");
  const { data: allorders } = useFetchCollection("orders");
  const { data: AllReviews } = useFetchCollection("reviews");


  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
    dispatch({
      type: "SAVE_ORDERS",
      payload: allorders,
    });
  }, [dispatch, data, allorders]);

  const { products } = useSelector((state) => state.products);
  const { OrderItems } = useSelector((state) => state.orders);


  // Earning logic here

  const allOrdersAmmount = [1, 2];
  OrderItems.map((item) => {
    const { orderAmount } = item;
    const totalAmmount = orderAmount;

    return allOrdersAmmount.push(totalAmmount);
  });
  let TotalEarning = 0;
  if (allOrdersAmmount) {
    TotalEarning = allOrdersAmmount.reduce((a, b) => {
      return a + b;
    });
  }

  // Line chart
  const linechart = {
    labels: [
      "jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Earning",
        data: allOrdersAmmount.map((data) => data),

        backgroundColor: "#f9f5ef",
        borderColor: "#bf4800",
      },
    ],
  };
  //Pie Chat
  const steps = ["Placed", "Picked", "Packed", "Shipped", "Delivered"];

  const AllOrderStatus = [];

  OrderItems.map((item) => {
    const allStatus = item.orderStatus;

    return AllOrderStatus.push(allStatus);
  });

  const GetOrderStatusCount = (arr, value) => {
    const statusCount = arr.filter((n) => n === value).length;
    return statusCount;
  };

  const Placed = GetOrderStatusCount(AllOrderStatus, "Shipped");
  const Picked = GetOrderStatusCount(AllOrderStatus, "Picked");
  const Packed = GetOrderStatusCount(AllOrderStatus, "Packed");
  const Shipped = GetOrderStatusCount(AllOrderStatus, "Shipped");
  const Delivered = GetOrderStatusCount(AllOrderStatus, "Delivered");

  const barChart = {
    labels: steps.map((data) => data),
    datasets: [
      {
        label: "Order Status",
        data: [Placed, Picked, Packed, Shipped, Delivered],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-all-box">
        <div className="dashboard-box">
          <div>
            <h1>{TotalEarning}</h1>
            <h2>Earnings</h2>
          </div>
          <div>
            <BiRupee />
          </div>
        </div>

        <div className="dashboard-box">
          <div>
            <h1>{products.length}</h1>
            <h2>Products</h2>
          </div>
          <div>
            <GiShoppingBag />
          </div>
        </div>

        <div className="dashboard-box">
          <div>
            <h1>{OrderItems.length}</h1>
            <h2>Orders</h2>
          </div>
          <div>
            <GiShoppingCart />
          </div>
        </div>

        <div className="dashboard-box">
          <div>
            <h1>{AllReviews.length}</h1>
            <h2>Reviews</h2>
          </div>
          <div>
            <MdOutlineReviews />
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h2>Eraning (past 12th months)</h2>
          <Line data={linechart} options={{ responsive: true }} />
        </div>

        <div className="chart-2">
          <h2>Order Status</h2>
          <Pie data={barChart} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
