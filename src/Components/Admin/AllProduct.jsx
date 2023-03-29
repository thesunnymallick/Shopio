import React, { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../Firebase/config";
import { db } from "../../Firebase/config";
import "./allProducts.scss";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import useFetchCollection from "../CustomHooks/useFetchCollection";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import CustomComponents from "../CustomComponents/CustomComponents";
import PaginationComponet from "../PaginationComponet/PaginationComponet";
// eslint-disable-next-line
function AllProduct() {
  const { data, isLoading } = useFetchCollection("products");
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { FilterProducts } = useSelector((state) => state.filter);

  // Products Save In redux
  useEffect(() => {
    dispatch({
      type: "STORE_PRODUCTS",
      payload: { products: data },
    });
    dispatch({
      type: "SEARCH_FILTER",
      payload: {
        products,
        search,
      },
    });
  }, [dispatch, data, products, search]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  const IndexOfLastProduct = currentPage * perPage;
  const IndexOfFirstProduct = IndexOfLastProduct - perPage;
  const CurrentProducts = FilterProducts.slice(
    IndexOfFirstProduct,
    IndexOfLastProduct
  );

  // Delete Product
  const DeleteProduct = async (id, imgUrl) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storagetRef = ref(storage, imgUrl);
      deleteObject(storagetRef);
      toast.success("Product Delete Successfull");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Confirm Delete function
  const ConfirmDeleteProduct = (id, imgUrl) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "are you sure Delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        DeleteProduct(id, imgUrl);
      },
      function cancelCb() {
        console.log("Cancel Delete");
      },
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "#bf4800",
        okButtonBackground: "#bf4800",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {FilterProducts.length !== 0 ? (
            <div className="all-admin-Products">
              <div className="products-search">
                <div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search product by name"
                  />
                  <AiOutlineSearch />
                </div>
                <div>
                  <span>
                    <b>{FilterProducts.length}</b> Product Found
                  </span>
                </div>
              </div>
              <div className="allProducts">
                <table>
                  <thead>
                    <tr>
                      <th>SL/NO</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CurrentProducts.map((product, index) => {
                      const { id, uploadImg, name, price, inStock, category } =
                        product;
                      return (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td className="table-img">
                            <img src={uploadImg} alt={name} />{" "}
                          </td>
                          <td>{name}</td>
                          <td>{price}</td>
                          <td>{inStock}</td>
                          <td>{category}</td>
                          <td>
                            <Link
                              className="edit-icon"
                              to={`/admin/addproduct/${id}`}
                            >
                              <AiOutlineEdit />
                            </Link>
                          </td>
                          <td>
                            <Link
                              className="delete-icon"
                              onClick={() =>
                                ConfirmDeleteProduct(id, uploadImg)
                              }
                            >
                              <AiOutlineDelete />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {FilterProducts.length >= perPage ? (
                <PaginationComponet
                  setCurrentPage={setCurrentPage}
                  perPage={perPage}
                  totalProducts={products.length}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <CustomComponents
              heading="No Products Found "
              pera="Click below button and create new product"
              url="/admin/addproduct/ADD"
              btnText="Go to add product"
            />
          )}
        </>
      )}
    </>
  );
}

export default AllProduct;
