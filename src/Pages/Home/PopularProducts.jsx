import React from "react";
import PopularCard from "./PopularCard";
import "./popularProducts.scss";
import Loader from "../../Components/Loader/Loader";
const PopularProducts = ({ collectionName, collection, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {collection.length !== 0 ? (
            <div className="popular-products">
              <h2>{collectionName}</h2>
              <div>
                {collection.map((item) => {
                  const { id, name, brand, price, uploadImg, inStock } = item;
                  return (
                    <PopularCard
                      key={id}
                      id={id}
                      name={name}
                      brand={brand}
                      img={uploadImg}
                      price={price}
                      inStock={inStock}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default PopularProducts;
