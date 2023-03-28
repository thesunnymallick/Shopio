import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { TiShoppingCart } from "react-icons/ti";
import Badge from "@mui/material/Badge";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { VscThreeBars } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";
import MobileNavBar from "./MobileNavBar";
import AdminRoute from "../AdminRoute/AdminRoute";
import { HashLink } from "react-router-hash-link";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthauthenticate, userName } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [showMobile, setShowMobile] = useState(false);
  const [search, setSearch] = useState("");

  // User Authauthenticate
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "SET_ACTIVE_USER",
          payload: {
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
          },
        });
      } else {
        dispatch({
          type: "REMOVE_ACTIVE_USER",
        });
      }
    });
  }, [dispatch]);

  // Serach Filter
  const SearchHandel = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_TEXT",
      payload: search,
    });
    navigate("/products");
  };

  // Log Out
  const LogoutHandel = () => {
    setShowMobile(false);
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <MobileNavBar
        showMobile={showMobile}
        setShowMobile={setShowMobile}
        LogoutHandel={LogoutHandel}
      />
      <div className="header-main">
        <div>
          <p>Free Shipping over $100 and Free Return</p>
        </div>

        <div>
          <a href="tel:+916297179586">Hotline: +916297179586</a>
        </div>
      </div>

      <div className="header-main-1">
        <div className="left-div">
          <Link to="/">
            <h1>Shop</h1>
            <span>.io</span>
          </Link>
        </div>
        <div className="mid-div">
          <form onSubmit={SearchHandel}>
            <input
              type="text"
              placeholder="Search Product Here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch />
            </button>
          </form>
        </div>
        <div className="right-div">
          <AdminRoute>
            <div>
              <Link to="/admin/dashboard">Admin</Link>
            </div>
          </AdminRoute>

          {isAuthauthenticate ? (
            <>
              <div>
                <p>{userName}</p>
                <Link to="/order-history">
                  <AiOutlineUser />
                </Link>
              </div>

              <div>
                <Link onClick={LogoutHandel}>Log out</Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </div>

        <div className="last-div">
          <div>
            <Link className="cart-link-icon" to="/cart">
              <Badge badgeContent={cartItems.length} color="primary">
                <TiShoppingCart />
              </Badge>
            </Link>
          </div>
        </div>
        <div className="Mobile-Nav-icon">
          {showMobile ? (
            <button onClick={() => setShowMobile(false)}>
              <RxCross1 />{" "}
            </button>
          ) : (
            <button onClick={() => setShowMobile(true)}>
              <VscThreeBars />
            </button>
          )}
        </div>
      </div>

      <div className="header-main-2">
        <div className="header-main-2-1">
          <Link to="/products">Our Shop</Link>
          <Link to="/order-history">My Orders</Link>
        </div>

        <div className="header-main-2-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <HashLink smooth to="/#services">
            Services
          </HashLink>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
