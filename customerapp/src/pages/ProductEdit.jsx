import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Product } from "../redux/product/productSlice";
import { useRef } from "react";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import axios from "axios";

function ProductEdit({ toggle }) {
  const fileRef = useRef(null);
  const { editingProduct } = useSelector((state) => state.product);
  const [editingItem, setEditingItem] = useState([]);
  const [image, setImage] = useState(null);
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
  }, []);
  const fetchByProductId = async () => {
    await axios
      .get(`http://localhost:5000/api/products/${editingProduct._id}`)
      .then((res) => {
        setEditingItem(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingItem
      )
      .then((res) => {
        console.log(res.data);
        navigate("/product");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleClose = () => {
    navigate("/product");
    dispatch(edit_Product(null));
  };
  const handleImage = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    console.log(editingItem.thumbnail);
  };
  // console.log(image);
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
                  onChange={(e) =>setEditingItem({...editingItem,category: e.target.value})}
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
