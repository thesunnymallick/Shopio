import React, { useState } from "react";
import "./addProduct.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "../../Firebase/config";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  //Get Products From redux
  const { products } = useSelector((state) => state.products);
  // Find Praticular Products
  const FindProducts = products.find((item) => item.id === id);


  const FromDedected = (id, f1, f2) => {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  };

  const intialState = {
    name: "",
    price: "",
    category: "",
    brand: "",
    des: "",
    inStock: "",
    uploadImg: "",
  };

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(() => {
    const NewState = FromDedected(id, { ...intialState }, FindProducts);
    return NewState;
  });

  const Category = [
    {
      id: 1,
      name: "HeadPhones",
    },
    {
      id: 2,
      name: "Laptops",
    },
    {
      id: 3,
      name: "Fashion",
    },
    {
      id: 4,
      name: "Electronics",
    },
    {
      id: 5,
      name: "SmartPhone",
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
  // Handel Input
  const HandelInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  // Handel Image
  const HandelImageChange = (e) => {
    let imageFile = e.target.files[0];
    UploadImage(imageFile);
  };

  // Upload Image in firebase
  const UploadImage = (imageFile) => {
    const storageRef = ref(storage, `shopio/${Date.now()}${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProduct({ ...product, uploadImg: downloadURL });
          toast.success("Image upload successfull");
        });
      }
    );
  };
  // Submit Products
  const ProductSubmitHandel = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        inStock: Number(product.inStock),
        des: product.des,
        uploadImg: product.uploadImg,
        CreateAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product upload successfull.");
      setProduct({ ...intialState });
      setProgress(0);
      navigate("/admin/allproduct");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  // Upadte Product
  const UpDateProductHandel = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.uploadImg !== FindProducts.uploadImg) {
      const storagetRef = ref(storage, FindProducts.uploadImg);
      deleteObject(storagetRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        inStock: Number(product.inStock),
        des: product.des,
        uploadImg: product.uploadImg,
        CreateAt: product.CreateAt,
        EditedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product update successfull.");
      navigate("/admin/allproduct");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="add-product">
          <form
            onSubmit={FromDedected(
              id,
              ProductSubmitHandel,
              UpDateProductHandel
            )}
          >
            <h1>{FromDedected(id, "Add New Product", "Edit Product")}</h1>

            <TextField
              id="outlined-basic"
              label="Product Name"
              fullWidth={true}
              variant="outlined"
              name="name"
              required
              value={product.name}
              onChange={(e) => HandelInputChange(e)}
            />

            <TextField
              id="outlined-number"
              type="number"
              label="Product Price"
              fullWidth={true}
              variant="outlined"
              name="price"
              value={product.price}
              onChange={(e) => HandelInputChange(e)}
            />
            <TextField
              select
              fullWidth={true}
              label="Choose Product Category"
              name="category"
              value={product.category}
              onChange={(e) => HandelInputChange(e)}
            >
              {Category.map((i) => (
                <MenuItem key={i.id} value={i.name}>
                  {i.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth={true}
              label="Choose Product Brand"
              name="brand"
              value={product.brand}
              onChange={(e) => HandelInputChange(e)}
            >
              {Brands.map((i, index) => (
                <MenuItem key={index} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-number"
              type="number"
              label="Product Stock"
              fullWidth={true}
              variant="outlined"
              name="inStock"
              value={product.inStock}
              onChange={(e) => HandelInputChange(e)}
            />

            <div className="uploadFile">
              <div className="progress">
                {" "}
                <LinearProgress variant="determinate" value={progress} />{" "}
                <span>{progress}%</span>{" "}
              </div>
              <input
                type="file"
                accept="image/*"
                id="uploadBtn"
                placeholder="product image"
                onChange={(e) => HandelImageChange(e)}
              />
              <label htmlFor="uploadBtn" className="upload-lable">
                <AiOutlineCloudUpload /> Upload image
              </label>
              <div className="uploadImg">
                {product.uploadImg ? (
                  <img src={product.uploadImg} alt={product.name} />
                ) : (
                  " "
                )}
              </div>
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Product Description"
              multiline
              fullWidth={true}
              maxRows={4}
              name="des"
              value={product.des}
              onChange={(e) => HandelInputChange(e)}
            />

            <Button variant="contained" type="submit">
              {FromDedected(id, "ADD Product", "Edit Product")}
            </Button>
          </form>
        </section>
      )}
    </>
  );
}

export default AddProduct;
