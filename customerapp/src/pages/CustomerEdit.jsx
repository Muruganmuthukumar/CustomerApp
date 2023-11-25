import React, { useEffect } from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Customer } from "../redux/customer/customerSlice";
import { useRef } from "react";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerEdit({ toggle }) {
  const fileRef = useRef(null);
  const { editingCustomer } = useSelector((state) => state.customer);
  const [editingItem, setEditingItem] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
  };

  useEffect(() => {
    fetchByUserId();
  }, []);
const fetchByUserId = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${editingCustomer._id}`
    );
    setEditingItem(response.data);
  } catch (error) {
    console.error(error.response.data);
    if (error.response) {
      toast.error(error.response.data.error || "Error fetching user data");
    } else if (error.request) {
      console.error(error.request);
      toast.error("Error fetching user data");
    } else {
      console.error("Error", error.message);
      toast.error("Error fetching user data");
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${editingCustomer._id}`,
        editingItem
      );

      // console.log(response.data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("User updated successfully");
        navigate("/customer");
      }
    } catch (err) {
      // console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error updating user");
      }
    }
  };

  const handleClose = () => {
    navigate("/customer");
    dispatch(edit_Customer(null));
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
                <label htmlFor="mobile">Mobile</label>
              </div>
            </div>
            <div className="">
              <select
                name=""
                id="membership"
                onChange={(e) =>
                  setEditingItem({ ...editingItem, membership: e.target.value })
                }
                value={editingItem.membership}
              >
                <option className="option" value="true">
                  Member
                </option>
                <option className="option" value="false">
                  Not a Member
                </option>
              </select>
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
