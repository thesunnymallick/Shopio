import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./sidebar.scss";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { AiOutlineFolderView, AiFillFileAdd } from "react-icons/ai";
import { BsViewStacked } from "react-icons/bs";
import AddProduct from "../../Components/Admin/AddProduct";
import AllProduct from "../../Components/Admin/AllProduct";
import ViewOrder from "../../Components/Admin/ViewOrder";
import Dashboard from "../../Components/Admin/Dashboard";
import AdminOrderDetails from "../../Components/Admin/AdminOrderDetails";

function Admin() {
  const [isopen, setIsOpen] = useState(false);
  //UserPhoto
  const { userName, userPhoto } = useSelector((state) => state.auth);

  const toggle = () => setIsOpen(!isopen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const AdminRoutes = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: <MdDashboard />,
    },
    {
      name: "All Product",
      path: "allproduct",
      icon: <AiOutlineFolderView />,
    },
    {
      name: "Add Product",
      path: "addproduct/ADD",
      icon: <AiFillFileAdd />,
    },
    {
      name: "View Order",
      path: "vieworder",
      icon: <BsViewStacked />,
    },
  ];

  return (
    <div className="AdminContaint">
      <motion.div
        animate={{
          width: isopen ? "200px" : "50px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="sidebar"
      >
        <div className="sidebar-1">
          <div>
            <AnimatePresence>
              {isopen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <h1>Shop</h1>
                  <span>.io</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <Link className="admin-is-open" onClick={toggle}>
              <VscThreeBars />
            </Link>
          </div>
        </div>
        <div className="sidebar-2">
          <div className={isopen ? "" : "adminImage"}>
            <img src={userPhoto} alt="userPhoto" />

            <AnimatePresence>
              {isopen && (
                <motion.p
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  Founder by <br />
                  {userName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="sidebar-3">
          {AdminRoutes.map((i, index) => (
            <NavLink to={i.path} key={index}>
              <div className="icon">{i.icon}</div>
              <AnimatePresence>
                {isopen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    <p>{i.name}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </div>
      </motion.div>

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="addproduct/:id" element={<AddProduct />} />
        <Route path="allProduct" element={<AllProduct />} />
        <Route path="viewOrder" element={<ViewOrder />} />
        <Route path="/order-details/:id" element={<AdminOrderDetails />} />
      </Routes>
    </div>
  );
}

export default Admin;
