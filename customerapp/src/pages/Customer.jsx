import React, { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listType } from "../redux/List/listSlice";
import { add_customer } from "../redux/customer/customerSlice";
import {
  handleFilterCustomer,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";
import { toast } from "react-toastify";

export default function Customer({ toggle }) {
  const { newCustomer } = useSelector((state) => state.customer); //
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
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

 const fetchData = async () => {
   try {
     const response = await axios.get("http://localhost:5000/api/users");
     setData(response.data);
     setNewData(response.data);
     // console.log(response);
   } catch (error) {
     console.error(error.message);
     if (error.response) {
       console.error(error.response.data);
       toast.error(error.response.data.error || "Error fetching data");
     } else if (error.request) {
       console.error(error.request);
       toast.error("Error fetching data");
     } else {
       console.error("Error", error.message);
       toast.error("Error fetching data");
     }
   }
 };
  dispatch(list(data));
  dispatch(listType("customer"));

  // console.log(data);

  const addCustomer = async (newCustomer) => {
    dispatch(add_customer(null));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        newCustomer
      );
      toast.success(response.data);
      // setData(response.data);
      // console.log(response.data);
      fetchData();
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

  if (newCustomer !== null) {
    addCustomer(newCustomer);
  }

  const removeCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );
      const updatedData = data.filter((user) => user._id !== id);
      setData(updatedData);

      if (typeof response.data === "string") {
        toast.info(response.data, {
          pauseOnHover: false,
        });
      } else if (response.data.message) {
        toast.info(response.data.message, {
          pauseOnHover: false,
        });
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            removeCustomer={removeCustomer}
            searchItem={searchItem}
          />
        </div>
      </div>
    </>
  );
}
