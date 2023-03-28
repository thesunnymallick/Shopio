// eslint-disable-next-line
//jsx-a11y/anchor-is-valid
import React from "react";
import "./mobileNavBar.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineIdcard,
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
} from "react-icons/ai";
import { HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { useSelector } from "react-redux";
import AdminRoute from "../AdminRoute/AdminRoute";
import { HashLink } from "react-router-hash-link";

const SocialIcons = [
  {
    icon: <AiOutlineLinkedin />,
    url: "https://www.linkedin.com/in/thesunnymallick/",
  },

  {
    icon: <AiOutlineFacebook />,
    url: "https://www.facebook.com/thesunnymallick/",
  },

  {
    icon: <AiOutlineInstagram />,
    url: "https://www.instagram.com/themallicksunny/",
  },

  {
    icon: <AiOutlineGithub />,
    url: "https://github.com/thesunnymallick",
  },
  {
    icon: <CgWebsite />,
    url: "https://thesunnymallick.vercel.app/",
  },
];

function MobileNavBar({ showMobile, setShowMobile, LogoutHandel }) {
  const { isAuthauthenticate, userName } = useSelector((state) => state.auth);

  const NavHandel = () => {
    setShowMobile(false);
  };
  const MobileNavItem = [
    {
      title: "Home",
      icon: <AiOutlineHome />,
      url: "/",
      navHandel: NavHandel,
    },
    {
      title: "About",
      icon: <AiOutlineIdcard />,
      url: "/about",
      navHandel: NavHandel,
    },
    {
      title: "My Order",
      icon: <HiOutlineShoppingBag />,
      url: "/order-history",
      navHandel: NavHandel,
    },
    {
      title: "Our Shop",
      icon: <FaBoxOpen />,
      url: "/products",
      navHandel: NavHandel,
    },
    {
      title: "Services",
      icon: <TbTruckDelivery />,
      url: "/#services",
      navHandel: NavHandel,
    },

    {
      title: "Contact",
      icon: <BiSupport />,
      url: "/contact",
      navHandel: NavHandel,
    },
  ];

  return (
    <div className={`MobileNavBar ${showMobile ? "showMobileBar" : ""}`}>
      <div className="mobile-nav-main">
        <div className="mobile-nav-main-1">
          <Link to="/" onClick={NavHandel}>
            <h1>Shop</h1>
            <span>.io</span>
          </Link>
        </div>
        <div className="mobile-nav-main-2">
          {isAuthauthenticate ? (
            <>
              <Link to="/order-history" onClick={NavHandel}>
                <HiOutlineUserCircle />
              </Link>
              <p>Hi, {userName}</p>
            </>
          ) : (
            <Link className="mobile-header" to="/login" onClick={NavHandel}>
              Log In
            </Link>
          )}
          <AdminRoute>
            <Link to="/admin/dashboard"  className="mobile-header" onClick={NavHandel}>
              Admin
            </Link>
          </AdminRoute>
        </div>
      </div>

      <div className="mobile-nav-2">
        {MobileNavItem.map((i, index) => (
          <HashLink to={i.url} onClick={i.navHandel} key={index}>
            <span>{i.icon}</span>
            <span>{i.title}</span>
          </HashLink>
        ))}
      </div>

      <div className="Mobile-nav-3">
        {isAuthauthenticate ? (
          <Link onClick={LogoutHandel}>log Out</Link>
        ) : (
          <Link onClick={NavHandel} to="/register">
            Create account
          </Link>
        )}
        <div>
          {SocialIcons.map((i, index) => (
            <a href={i.url} key={index} target="blank">
              {i.icon}{" "}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export { SocialIcons };
export default MobileNavBar;
