import React, { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listColumnName, listType } from "../redux/List/listSlice";
import { updated_Customer } from "../redux/customer/customerSlice";

export default function Customer({ toggle }) {
  const { updatedCustomer }=useSelector((state)=>state.customer)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    mobile: "Mobile",
    membership: "Membership",
  };

  // const { editingCustomer } = useSelector((state)=>state.customer)
  // console.log(editingCustomer);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://customer-vwy2.onrender.com/customers");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error("Error Fetching Customers Data", err);
      }
    }
    fetchData();
  }, []);

  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("customer"));

  const updateCustomer = async (userData) => {
    try {
      const response = await fetch(
        `https://customer-vwy2.onrender.com/customers/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const newData = response.json();
      setData(data.map((item) => (item.id === userData.id ? newData : item)));
      dispatch(updated_Customer(null));
    } catch (error) {
      console.error("Error Updating Data", error);
    }
  };
  if(updatedCustomer!=null){
    updateCustomer(updatedCustomer);
    // console.log(updatedCustomer,"updated Customer");
  }

  return (
    <>
      <div>
        <div>
          <List toggle={toggle} />
        </div>
      </div>
    </>
  );
}
