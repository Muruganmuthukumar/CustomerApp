import React from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_customer } from "../redux/customer/customerSlice";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function CustomerAdd({ toggle }) {
  const fileRef = useRef(null);
  const { newCustomer } = useSelector((state) => state.customer);
  const [editingItem, setEditingItem] = useState([]);
  const [select, setSelect] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setEditingItem({ ...newCustomer });
  }, [newCustomer]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
    // console.log(editingItem);
  };
  // console.log(editingItem);
  const handleSubmit = (e) => {
    e.preventDefault();
    editingItem.membership = select;
    editingItem.photoURL =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU";
    console.log(editingItem);
    dispatch(add_customer(editingItem));
    navigate("/customer");
  };

  const handleClose = () => {
    navigate("/customer");
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    toast.info("Image Uploading Success");
  };
  // console.log(image);
  return (
    <>
      <div
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Customer</h3>
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
                src={URL.createObjectURL(image)}
                alt="avatar"
              />
            ) : (
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={
                  editingItem.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU"
                }
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
                  value={editingItem.firstname || ""}
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
                  value={editingItem.lastname || ""}
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
                  value={editingItem.email || ""}
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
                  value={editingItem.mobile || ""}
                  onChange={handleChange}
                />
                <label htmlFor="mobile">mobile</label>
              </div>
            </div>
            <div>
              <div className="">
                <select
                  name=""
                  id="membership"
                  onChange={(e) => setSelect(e.target.value)}
                  value={select}
                >
                  <option className="option" value="true">
                    Member
                  </option>
                  <option className="option" value="false">
                    Not a Member
                  </option>
                </select>
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
