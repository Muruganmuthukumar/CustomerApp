import React from "react";
import "../Styles/SidePanel.css";
import { Link, Outlet } from "react-router-dom";
import {
  FaCartArrowDown,
  FaChartLine,
  FaInfoCircle,
  FaStoreAlt,
  FaUser,
} from "react-icons/fa";

export default function SidePanel() {
  return (
    <div className="container">
      <div className="side-panel">
        <div className="user">Admin</div>
        <div className="link-container">
          <ul>
            <Link to={"/"}>
                <FaChartLine className="icon" />
              <li>
                DashBoard
              </li>
            </Link>

            <Link to={"/customer"}>
                <FaUser className="icon" />
              <li>
                Customer
              </li>
            </Link>
            <Link to={"/order"}>
                <FaCartArrowDown className="icon" />
              <li>
                Order
              </li>
            </Link>
            <Link to={"/product"}>
                <FaStoreAlt className="icon" />
              <li>
                Product
              </li>
            </Link>
            <Link to={"/about"}>
                <FaInfoCircle className="icon" />
              <li>
                About
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
