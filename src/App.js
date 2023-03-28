import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ALL Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { AdminRouteLink } from "./Components/AdminRoute/AdminRoute";

// ALL pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Products from "./Pages/Products/Products";
import Resetpassword from "./Pages/Auth/Resetpassword";
import Admin from "./Pages/Admin/Admin";
import ProductsDetails from "./Pages/Products/ProductsDetails";
import Cart from "./Pages/Cart/Cart";
import Shipping from "./Pages/Checkout/Shipping";

import "./style/app.scss";
import Payment from "./Pages/Payment/Payment";
import PaymentSuccessed from "./Pages/Payment/PaymentSuccessed";
import OrderHistory from "./Pages/Order/OrderHistory";
import OrderProcessing from "./Pages/Checkout/OrderProcessing";
import OrderDetails from "./Pages/Order/OrderDetails";
import ReviewProduct from "./Pages/Order/ReviewProduct";
import ReviewSubmit from "./Pages/Order/ReviewSubmit";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route
          path="/admin/*"
          element={
            <AdminRouteLink>
              <Admin />
            </AdminRouteLink>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetails/:id" element={<ProductsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order-processing" element={<OrderProcessing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<PaymentSuccessed />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/product-review/:id" element={<ReviewProduct />} />
        <Route path="/review-submit" element={<ReviewSubmit />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
