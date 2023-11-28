import React from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function CustomerAdd({ toggle }) {
  const fileRef = useRef(null);
  const { newCustomer } = useSelector((state) => state.customer);
  const [editingItem, setEditingItem] = useState([]);
  const [select, setSelect] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [base64, setBase64] = useState({});

  useEffect(() => {
    setEditingItem({ ...newCustomer });
  }, [newCustomer]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditingItem({
      ...editingItem,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editingItem.membership = select;
    editingItem.photoURL = image ? base64 :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAUvIj8tIlcc6MemlkLaXGlOLNplzf-3euA&usqp=CAU";
    console.log(editingItem);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        editingItem
      );
      toast.success(response.data);
      navigate("/customer");
      // setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        toast.error(error.response.data.error);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleClose = () => {
    navigate("/customer");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImage(file);
        setBase64(base64String)
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
