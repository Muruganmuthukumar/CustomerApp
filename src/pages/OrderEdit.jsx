import React from 'react'
import "../Styles/CustomerEdit.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_Order, updated_Order } from "../redux/order/orderSlice";
import { FaChevronLeft, FaRupeeSign, FaSave } from "react-icons/fa";
import { useEffect } from 'react';

export default function OrderEdit({toggle}) {

    const { editingOrder } = useSelector((state) => state.order);
    const [editingItem, setEditingItem] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      setEditingItem((prev) => ({ ...prev, ...editingOrder }));
    }, [editingOrder]);
    
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
      dispatch(updated_Order(editingItem));
      // console.log(editingItem,"Submitted Data");
      navigate("/order");
    };
  
    const handleClose = () => {
      navigate("/order");
      dispatch(edit_Order(null))
    };

  return (
    <>
        <div 
        className="edit-container"
        style={{ width: toggle ? "65vw" : "70vw" }}
      >
        <div className="form-container">
          <h3>Order</h3>
          <form>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="productName"
                  required
                  placeholder=""
                  value={editingItem.productName}
                  onChange={handleChange}
                />
                <label htmlFor="productName">productname</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="customerName"
                  required
                  placeholder=""
                  value={editingItem.customerName}
                  onChange={handleChange}
                />
                <label htmlFor="customername">customername</label>
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
                <label htmlFor="price">price(<FaRupeeSign style={{height:"15px", width:"15px"}}/>)</label>
              </div>
            </div>
            <div>
              <div className="input-box">
                <input
                  type="text"
                  id="quantity"
                  required
                  placeholder=""
                  value={editingItem.quantity}
                  onChange={handleChange}
                />
                <label htmlFor="quantity">quantity</label>
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
  )
}
