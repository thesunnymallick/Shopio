import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button } from "@mui/material";
import banner from "../../images/main-banner.jpg";
import banner1 from "../../images/main-banner-1.jpg";
import banner2 from "../../images/main-banner-2.jpg";
import banner3 from "../../images/main-banner-3.jpg";
import banner4 from "../../images/main-banner-4.jpg";
import banner5 from "../../images/main-banner-5.jpg";
import catbanner1 from "../../images/catbanner-01.jpg";
import catbanner2 from "../../images/catbanner-02.jpg";
import catbanner3 from "../../images/catbanner-03.jpg";
import catbanner4 from "../../images/catbanner-04.jpg";

import "./home.scss";
import Services from "./Services";
import PopularProducts from "./PopularProducts";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../Components/CustomHooks/useFetchCollection";

function Home() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");
  const { products } = useSelector((state) => state.products);

  // Products Save In redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
  }, [data, dispatch]);

  const featuredProducts = products.slice(22, 32);
  const popularProducts = products.slice(40, 50);

  const imageBox = [
    {
      img: catbanner1,
      lable: "best Sale",
      title: "Laptops Max",
      des: "From $ 1699.00 or $64.62/mo for 12mo",
    },
    {
      img: catbanner3,
      lable: "New ARRIVAL",
      title: "Buy iPad Air",
      des: "From $49.91 or $49.91/mo",
    },

    {
      img: catbanner2,
      lable: "15% OFF",
      title: "SmartWatch 7",
      des: "Shop the latest band styles and color",
    },

    {
      img: catbanner4,
      lable: "Free ENGRAVING",
      title: "Air Pods Max",
      des: "High-fidelity palyback ultra-low distortion",
    },
  ];

  const CarouselContent = [
    {
      img: banner1,
      lable: "Supercharged for pro",
      title: "iphone S13+ Pro.",
      des: "From $999.00 or $41.62/mo for 24mo FootNote",
      url: "/products",
    },

    {
      img: banner,
      lable: "Free ENGRAVING",
      title: "Air Pods Max.",
      des: "High-fidelity palyback ultra-low distortion",
      url: "/products",
    },

    {
      img: banner2,
      lable: "70% Off",
      title: "Bomber Jacket",
      des: "10% Instant Discount up to INR 500 on IDBI Bank Card",
      url: "/products",
    },
    {
      img: banner3,
      lable: "Trending Item",
      title: "Men's sneakers",
      des: "Shop the latest band styles and color",
      url: "/products",
    },
    {
      img: banner4,
      lable: "Best Sale",
      title: "Jacket",
      des: "Buy 3 Get 5% Off, Buy 4 Get 10% Off",
      url: "/products",
    },
    {
      img: banner5,
      lable: "New session",
      title: "Women's Hooded",
      des: " 100% Premium bio-washed soft and smooth skin",
      url: "/products",
    },
  ];

  return (
    <>
      <div className="home">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          interval={2000}
          showThumbs={false}
          showStatus={false}
        >
          {CarouselContent.map((i, index) => (
            <div className="Carousel-Content" key={index}>
              <img src={i.img} alt="" />
              <div className="Carousel-Content-1">
                <span>{i.lable}</span>
                <h1>{i.title}</h1>
                <p>{i.des}</p>
                <Link to={i.url}>
                  <Button variant="contained">Buy Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
        <aside>
          <Link to="/products">
            <div className="asideContetn">
              {imageBox.map((i, index) => (
                <div key={index}>
                  <img src={i.img} alt={i.title} />
                  <div className="asideContetn">
                    <span>{i.lable}</span>
                    <h1>{i.title}</h1>
                    <p>{i.des}</p>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </aside>
      </div>

      <Services />
      <PopularProducts
        collectionName={"Featured Collection"}
        collection={featuredProducts}
        isLoading={isLoading}
      />
      <PopularProducts
        collectionName={"Popular Collection"}
        collection={popularProducts}
        isLoading={isLoading}
      />
    </>
  );
}

export default Home;
