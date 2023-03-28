import React, { useEffect, useState } from "react";
import "./FilterProduct.scss";
import { BiGridSmall, BiHeadphone, BiLaptop } from "react-icons/bi";
import { GiAmpleDress, GiSmartphone } from "react-icons/gi";
import { BsLightbulb } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";
function FilterProduct({ Toggel }) {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("ALL");
  const [price, setPrice] = useState(90000);
  const dispatch = useDispatch();

  const Categoreys = [
    {
      cat: "ALL",
      icon: <BiGridSmall />,
    },
    {
      cat: "HeadPhones",
      icon: <BiHeadphone />,
    },
    {
      cat: "Laptops",
      icon: <BiLaptop />,
    },
    {
      cat: "Fashion",
      icon: <GiAmpleDress />,
    },
    {
      cat: "SmartPhone",
      icon: <GiSmartphone />,
    },
    {
      cat: "Electronics",
      icon: <BsLightbulb />,
    },
  ];
  const Brands = [
    "ALL",
    "HP",
    "Lenovo",
    "Adidas",
    "Dell",
    "Samsung",
    "Apple",
    "Xiaomi",
    "Bose",
    "Sennheiser",
    "Sony",
    "Zara",
    "H&M",
  ];

  // Filter By Category
  const CategoryFilter = (cat) => {
    setCategory(cat);
    dispatch({
      type: "CATEGORY_FILTER",
      payload: {
        category: cat,
        products,
      },
    });
    Toggel();
  };
  //Filter By brand
  useEffect(() => {
    dispatch({
      type: "BRAND_FILTER",
      payload: {
        brand,
        products,
      },
    });
  }, [brand, products, dispatch]);

  // Filter by price
  useEffect(() => {
    dispatch({
      type: "PRICE_FILTER",
      payload: {
        price,
        products,
      },
    });
  }, [dispatch, price, products]);

  const ClearFilter = () => {
    setCategory("ALL");
    setBrand("ALL");
    setPrice(maxPrice);
    Toggel();
  };

  const BrandHandel = (e) => {
    setBrand(e.target.value);

    Toggel();
  };

  return (
    <div className="filterProduct">
      <div className="category">
        <h2>Shop By Category</h2>
        <ul>
          {Categoreys.map((i, index) => (
            <li
              key={index}
              className={`${i.cat === category ? "activeCategory" : ""}`}
              onClick={() => CategoryFilter(i.cat)}
            >
              {i.icon}
              <p>{i.cat}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter">
        <h2>Filter By</h2>
        <div className="brand">
          <label>Brand</label>
          <select value={brand} onChange={BrandHandel}>
            {Brands.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Price</label>
          <div>
            <Slider
              onClick={() => Toggel()}
              value={price}
              size="medium"
              onChange={(e) => setPrice(e.target.value)}
              min={minPrice}
              max={maxPrice}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <Button variant="contained" size="small" onClick={ClearFilter}>
          Clear Filter
        </Button>
      </div>
    </div>
  );
}

export default FilterProduct;
