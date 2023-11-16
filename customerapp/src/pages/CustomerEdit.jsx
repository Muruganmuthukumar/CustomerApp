import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Customer, updated_Customer } from "../redux/customer/customerSlice";
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
    dispatch(edit_Customer(null))
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
                <input
                  type="text"
                  id="firstname"
                  required
                  placeholder=""
                  value={editingItem.firstname}
                  onChange={handleChange}
                />
                <label htmlFor="firstname">Firstname</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="lastname"
                  required
                  placeholder=""
                  value={editingItem.lastname}
                  onChange={handleChange}
                />
                  <label htmlFor="lastname">Lastname</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=""
                  value={editingItem.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="mobile"
                  required
                  placeholder=""
                  value={editingItem.mobile}
                  onChange={handleChange}
                />
                <label htmlFor="mobile">Mobile</label>
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
