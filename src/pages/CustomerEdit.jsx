import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updated_Customer } from "../redux/customer/customerSlice";
import { useRef } from "react";
import { FaChevronLeft, FaSave } from "react-icons/fa";

function CustomerEdit({ toggle }) {
  const fileRef = useRef(null);
  const { editingCustomer } = useSelector((state) => state.customer);
  const [editingItem, setEditingItem] = useState([]);
  const [image, setImage] = useState(null);
  // const [border, setBorder]=useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setEditingItem((prev) => ({ ...prev, ...editingCustomer }));
  }, [editingCustomer]);

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
    dispatch(updated_Customer(editingItem));
    navigate("/customer");
  };

  const handleClose = () => {
    navigate("/customer");
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
          <h3>Customer</h3>
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
                <label htmlFor="firstname">Firstname</label>
                <input
                  type="text"
                  id="firstname"
                  required
                  placeholder="Firstname"
                  value={editingItem.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="lastname">Lastname</label>
                <input
                  type="text"
                  id="lastname"
                  required
                  placeholder="Lastname"
                  value={editingItem.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={editingItem.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="input-box">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  required
                  placeholder="Mobile"
                  value={editingItem.mobile}
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
              <FaSave className="icon" />
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerEdit;
