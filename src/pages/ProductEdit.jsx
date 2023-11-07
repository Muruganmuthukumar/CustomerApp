import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updated_Product } from "../redux/product/productSlice";
// import { useRef } from "react";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";

function ProductEdit({ toggle }) {
//   const fileRef = useRef(null);
  const { editingProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState([]);
//   const [image, setImage] = useState(null);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updated_Product(editingItem));
    // console.log(editingItem,"Submitted Data");
    navigate("/product");
  };

  const handleClose = () => {
    navigate("/product");
  };
//   const handleImage = (e) => {
//     // console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//     editingItem.thumbnail=e.target.files[0]
//     console.log(editingItem.thumbnail);
//   };
  // console.log(image);
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Product</h3>
          <div>
            {/* <input
              hidden
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            {image ? (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer",border:"3px solid red" }}
                src={URL.createObjectURL(image)}
                alt="avatar"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={editingItem.thumbnail}
                alt="avatar"
              />
            )} */}
          </div>
          <form>
            <div>
              <div className="input-box">
                <label htmlFor="title">title</label>
                <input
                  type="text"
                  id="title"
                  required
                  placeholder="title"
                  value={editingItem.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="brand">brand</label>
                <input
                  type="text"
                  id="brand"
                  required
                  placeholder="brand"
                  value={editingItem.brand}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="price">price(<FaRupeeSign style={{height:"15px", width:"15px"}}/>)</label>
                <input
                  type="price"
                  id="price"
                  required
                  placeholder="price"
                  value={editingItem.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="rating">rating</label>
                <input
                  type="text"
                  id="rating"
                  required
                  placeholder="rating"
                  value={editingItem.rating}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="stock">quantity</label>
                <input
                  type="text"
                  id="stock"
                  required
                  placeholder="stock"
                  value={editingItem.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <div className="btn-container">
            <button onClick={handleClose} className="close-btn">
                <FaChevronLeft className="icon" />
                Back
            </button>
            <button onClick={handleSubmit}>
                <FaSave className="icon"/>
                Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
