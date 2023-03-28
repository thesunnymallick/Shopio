import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import "./products.scss"
import {BsFillGridFill } from "react-icons/bs"
import { FaListUl } from "react-icons/fa"
import useFetchCollection from '../../Components/CustomHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import ProductCart from './ProductCart'
import Loader from '../../Components/Loader/Loader'
import { FiFilter } from "react-icons/fi"
import PaginationComponet from '../../Components/PaginationComponet/PaginationComponet'
import CustomComponents from '../../Components/CustomComponents/CustomComponents'
function Products() {

  const { data, isLoading } = useFetchCollection("products")
  const { products } = useSelector((state) => state.products)
  const { searchText } = useSelector((state) => state.filter)
  const { FilterProducts } = useSelector((state) => state.filter)
  const dispatch = useDispatch();

  const [grid, setGrid] = useState(true)
  const [sort, setSort] = useState("Latest")
  const [showFilter, setShowFilter] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const IndexOfLastProduct = currentPage * perPage;
  const IndexOfFirstProduct = IndexOfLastProduct - perPage;
  const CurrentProducts = FilterProducts.slice(IndexOfFirstProduct, IndexOfLastProduct);


  // Products Save In redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data }
    })
    dispatch({
      type: "PRICE_RANGE_PRODUCT",
      payload: { products: data }
    })
  }, [dispatch, data])

  // Search and result 
  useEffect(() => {
    dispatch({
      type: "SEARCH_FILTER",
      payload: {
        search: searchText,
        products: products,
      }
    })
  }, [dispatch, products, searchText])

  // Sort by Filter

  useEffect(() => {
    dispatch({
      type: "SORT_FILTER",
      payload: {
        sort,
        products,
      }
    })
  }, [dispatch, products, sort])


  // Toggel Filter
  const Toggel = () => {
    setShowFilter(false)
  }

  return (
    <>

      {
        isLoading ? <Loader /> : FilterProducts.length === 0 ? (

          <CustomComponents
            heading={"No Product Found"}
            pera={"Click below button and go to home page."}
            url={"/"}
            btnText={"Go To Home"}
          />

        ) : (
          <div className="products">
            <div className={`${showFilter ? "products-1 showFilter" : "products-1"}`}>
              <FilterProduct Toggel={Toggel} />
            </div>
            <div className="products-2">
              <div className="products-2-1">
                <div>
                  <label>Sort By:</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} >
                    <option value="Latest">Latest</option>
                    <option value="Lowest-price">Lowest Price</option>
                    <option value="Highest-price">Highest Price</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                </div>
                <div>
                  <p><span>{FilterProducts.length}</span>Product Found</p>
                  <BsFillGridFill onClick={() => setGrid(true)} />
                  <FaListUl onClick={() => setGrid(false)} />
                  <div className='filter-btn'>
                    <button onClick={() => setShowFilter(!showFilter)} >
                      <FiFilter /> <span>Filter</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className={`products-2-2 ${grid ? "products-grid" : "products-list"}`}>
                {
                  CurrentProducts.map((i) => (
                    <ProductCart
                      key={i.id}
                      id={i.id}
                      name={i.name}
                      desc={i.des}
                      price={i.price}
                      img={i.uploadImg}
                      brand={i.brand}
                      grid={grid}
                      inStock={i.inStock}
                      product={i}
                    />
                  ))
                }
              </div>
              {
                FilterProducts.length >= perPage ? (
                  <PaginationComponet
                    setCurrentPage={setCurrentPage}
                    perPage={perPage}
                    totalProducts={products.length}
                  />
                ) : ""
              }
            </div>
          </div>)

      }

    </>

  )
}

export default Products