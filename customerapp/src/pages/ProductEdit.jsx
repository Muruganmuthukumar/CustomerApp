import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Product } from "../redux/product/productSlice";
import { useRef } from "react";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';

function ProductEdit({ toggle }) {
  const fileRef = useRef(null);
  const { editingProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState([]);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setEditingItem((prev) => ({ ...prev, ...editingProduct }));
  }, [editingProduct]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
  };

  useEffect(() => {
    fetchByProductId();
    // eslint-disable-next-line
  }, []);
  const fetchByProductId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${editingProduct._id}`
      );
      setEditingItem(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching product by ID:", error.message);
      if (error.response) {
        console.error(error.response.data);
        toast.error(
          error.response.data.error || "Error fetching product by Id"
        );
      } else if (error.request) {
        console.error(error.request);
        toast.error("Error fetching product by ID");
      } else {
        console.error("Error", error.message);
        toast.error("Error fetching product by ID");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editingItem.thumbnail = image ? base64 : editingItem.thumbnail;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingItem
      );

      // console.log(response.data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Product updated successfully");
        navigate("/product");
      }
    } catch (err) {
      // console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error updating product");
      }
    }
  };

  const handleClose = () => {
    navigate("/product");
    dispatch(edit_Product(null));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImage(file);
        setBase64(base64String);
        toast.info("Image Uploaded Successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error uploading image");
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Product</h3>
          <div className="img-container">
            <input
              hidden
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            {image ? (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer", alignSelf: "flex-start" }}
                src={URL.createObjectURL(image)}
                alt="product"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={editingItem.thumbnail}
                alt="product"
              />
            )}
          </div>
          <form>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="title"
                  required
                  placeholder=""
                  value={editingItem.title || ""}
                  onChange={handleChange}
                />
                <label htmlFor="title">productname</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="brand"
                  required
                  placeholder=""
                  value={editingItem.brand || ""}
                  onChange={handleChange}
                />
                <label htmlFor="brand">brand</label>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="category"
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  value={editingItem.category}
                >
                  <option defaultChecked={true}>- Category -</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptops</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="skincare">Skincare</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home-decoration</option>
                </select>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="price"
                  id="price"
                  required
                  placeholder=""
                  value={editingItem.price || ""}
                  onChange={handleChange}
                />
                <label htmlFor="price">
                  price(
                  <FaRupeeSign style={{ height: "15px", width: "15px" }} />)
                </label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="stock"
                  required
                  placeholder=""
                  value={editingItem.stock || ""}
                  onChange={handleChange}
                />
                <label htmlFor="stock">quantity</label>
              </div>
            </div>
          </form>
          <div className="btn-container">
            <button onClick={handleClose} className="close-btn">
              <FaChevronLeft className="icon" />
              Back
            </button>
            <button onClick={handleSubmit}>
              <FaSave className="icon" />
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
