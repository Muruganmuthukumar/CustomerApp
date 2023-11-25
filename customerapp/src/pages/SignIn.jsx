import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import "../Styles/SignIn.css";
import { setSuccess } from "../redux/List/listSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMsg = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_CENTER,
      toastId:"id"
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/admin/login", formData)
    .then((res) => {
        console.log(res.data);
        dispatch(setSuccess(res.data));
        dispatch(isAuthenticated(true));
        navigate("/");
      })
      .catch((err) => {
        errorMsg(err.response.data);
        // console.log(err.response.data);
      });
    // console.log(formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  return (
    <>
      <section className="signin-container">
        <form onSubmit={handleSubmit}>
          {/* <h2>Sign In</h2> */}
          <h1>Admin Dashboard</h1>
          <div className="input-container">
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="none"
              placeholder=""
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder=""
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button>Sign In</button>
        </form>
      </section>
    </>
  );
};

export default SignIn;
