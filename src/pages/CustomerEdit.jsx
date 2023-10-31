import React from "react";
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import img from '../assets/profile.avif' 

function CustomerEdit({ editingItem, setEditingItem }) {
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setEditingItem({
      ...editingItem,
      [name]: value,
      checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    navigate('/customer')
  };
  return (
    <>
      <div className="cust-edit-container">
        <div className="form-container">
          <button onClick={handleClose} className="close-btn">
            X
          </button>
          <img src={img} alt="avatar" srcSet="" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              required
              value={editingItem.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              required
              value={editingItem.lastname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={editingItem.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile No"
              required
              value={editingItem.mobile}
              onChange={handleChange}
            />
            <div className="member">
              <input
                type="radio"
                name="membership"
                onChange={handleChange}
                checked={
                  editingItem.membership === true
                    ? true
                    : !editingItem.membership
                }
                id="true"
              />
              <label htmlFor="true">Member</label>
              <input
                type="radio"
                name="membership"
                onChange={handleChange}
                checked={
                  editingItem.membership === false
                    ? true
                    : !editingItem.membership
                }
                id="false"
              />
              <label htmlFor="false">Not a Member</label>
            </div>
            <button>Save</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerEdit;
