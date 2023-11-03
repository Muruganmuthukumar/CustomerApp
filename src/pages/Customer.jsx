import React, { useEffect, useState } from "react";
import "../Styles/Customer.css";
import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import List from "../components/List";
import { useDispatch } from "react-redux";
import {
  list,
  listColumnName,
  listCount,
  listType,
} from "../redux/List/listSlice";

export default function Customer({toggle}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      mobile: "Mobile",
      membership: "Membership",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/customers");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log("Error Fetching Customers Data", err);
      }
    }
    fetchData();
  }, []);
  dispatch(list(data));
  dispatch(listCount("Customer"));
  dispatch(listColumnName(columnName));
  dispatch(listType("customer"));


  // const handleEdit = (data) => {
  //   console.log(data);
  //   setEditingItem(data);
  //   navigate("/customer-edit");
  // };

  return (
    <>
      <List toggle={toggle}/>
    </>
  );
}
