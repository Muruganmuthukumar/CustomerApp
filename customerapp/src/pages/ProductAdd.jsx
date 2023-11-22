import React, { useRef } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_Product } from "../redux/product/productSlice";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useEffect } from "react";

function ProductAdd({ toggle }) {
  const fileRef = useRef(null);
  const { newProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setEditingItem({...newProduct});
  }, [newProduct]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
  };
  // console.log(editingItem);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(editingItem);
    editingItem.thumbnail =
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png";
    editingItem.rating ="0.0."
    dispatch(add_Product(editingItem));
    navigate("/product");
  };

  const handleClose = () => {
    navigate("/product");
  };

  const handleImage = (e) => {
      setImage(e.target.files[0]);
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
                alt="avatar"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={editingItem.photoURL}
                alt="avatar"
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
                  value={editingItem.title}
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
                  value={editingItem.brand}
                  onChange={handleChange}
                />
                <label htmlFor="brand">Brand</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="email"
                  id="stock"
                  required
                  placeholder=""
                  value={editingItem.stock}
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
                  value={editingItem.price}
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
