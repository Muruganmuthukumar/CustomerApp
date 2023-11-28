import React, { useRef } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProductAdd({ toggle }) {
  const fileRef = useRef(null);
  const { newProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState([]);
  const [select, setSelect] = useState("null");
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState({});

  useEffect(() => {
    setEditingItem({ ...newProduct });
  }, [newProduct]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    editingItem.category = select;
    editingItem.thumbnail = image ? base64 : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        editingItem
      );
      toast.success(response.data, {
        pauseOnHover: false,
      });
      navigate("/product");
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error, {
        pauseOnHover:false
      })
    }
  };

  const handleClose = () => {
    navigate("/product");
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
          <div>
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
                src={URL.createObjectURL(image)}
                alt="product"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={
                  editingItem.photoURL ||
                  "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                }
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
                <label htmlFor="title">Product Name</label>
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
                <label htmlFor="brand">Brand</label>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="category"
                  onChange={(e) => setSelect(e.target.value)}
                  value={select}
                >
                  <option value="null">- Category -</option>
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
                  type="email"
                  id="stock"
                  required
                  placeholder=""
                  value={editingItem.stock || ""}
                  onChange={handleChange}
                />
                <label htmlFor="stock">Stock</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="price"
                  required
                  placeholder=""
                  value={editingItem.price || ""}
                  onChange={handleChange}
                />
                <label htmlFor="price">Price</label>
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
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
