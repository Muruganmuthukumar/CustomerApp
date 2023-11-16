import React, { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listColumnName, listType } from "../redux/List/listSlice";
import {
  delete_Customer,
  updated_Customer,
  add_customer,
} from "../redux/customer/customerSlice";
import {
  handleFilterCustomer,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";

export default function Customer({ toggle }) {
  const { updatedCustomer, deletingId, newCustomer, listData } = useSelector(
    (state) => state.customer
  ); //
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    mobile: "Mobile",
    membership: "Membership",
  };
  const [searchType, setSearchType] = useState("");
  const [select, setSelect] = useState([
    "All",
    "Firstname",
    "Lastname",
    "Email",
    "Mobile",
  ]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [newData, setNewData] = useState([]);
  // const { editingCustomer } = useSelector((state)=>state.customer)
  // console.log(editingCustomer);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://customer-vwy2.onrender.com/customers"
      );
      const data = await response.json();
      setData(data);
      setNewData(data);
    } catch (err) {
      console.error("Error Fetching Customers Data", err);
    }
  }
  // console.log(data);

  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("customer"));

  const addCustomer = async (newCustomer) => {
    dispatch(add_customer(null));
    try {
      const response = await fetch(
        "https://customer-vwy2.onrender.com/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        }
      );
      const newData = await response.json();
      setData(newData);
      fetchData();
      // console.log(listData);
      // console.log(data);
    } catch (err) {
      console.log("Error Adding Data", err);
    }
  };

  if (newCustomer != null) {
    addCustomer(newCustomer);
    // window.location.reload(false);
    // console.log(newCustomer);
  }
  const updateCustomer = async (updatedCustomer) => {
    try {
      const response = await fetch(
        `https://customer-vwy2.onrender.com/customers/${updatedCustomer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCustomer),
        }
      );
      const editedCustomer = await response.json();
      const result = listData.map((item) =>
        item.id === editedCustomer.id ? editedCustomer : item
      );
      setData(result);
      // console.log(result);
      // console.log(editedCustomer);
      dispatch(updated_Customer(null));
    } catch (error) {
      console.error("Error Updating Data", error);
    }
  };
  if (updatedCustomer !== null) {
    updateCustomer(updatedCustomer);
    // console.log(updatedCustomer, "updated Customer");
  }
  const removeCustomer = (customerId) => {
    fetch(`https://customer-vwy2.onrender.com/customers/${customerId}`, {
      method: "DELETE",
    })
      .then(() => {
        const removedCustomer = newData.filter(
          (data) => data.id !== customerId
        ); //id only
        // console.log(removedCustomer);
        setData(removedCustomer);
        fetchData();
        dispatch(delete_Customer(null));
      })
      .catch((error) => console.error("Error Deleting Data", error));
  };

  if (deletingId !== null) {
    // console.log(deletingId);
    removeCustomer(deletingId);
  }

  useEffect(() => {
    handleFilterCustomer(
      searchType,
      newData,
      searchItem,
      setFilteredData,
      filteredData
    );
  }, [searchItem, searchType]);

  useEffect(() => {
    setData([...filteredData]);
  }, [filteredData, searchType]); //searchbox state should be inside useEffect
  // console.log(filteredData);

  return (
    <>
      <div>
        <div>
          <List
            toggle={toggle}
            select={select}
            handleSearch={handleSearch}
            handleSearchType={handleSearchType}
            setSearchType={setSearchType}
            setFilterData={setData}
            newData={newData}
            setSearchItem={setSearchItem}
            updateCustomer={updateCustomer}
          />
        </div>
      </div>
    </>
  );
}
