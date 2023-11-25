import React, { useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listColumnName, listType } from "../redux/List/listSlice";
import { useEffect } from "react";
import { add_Order } from "../redux/order/orderSlice";
import {
  handleFilterOrder,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";
import { toast } from "react-toastify";

export default function Order({ toggle }) {
  const { newOrder } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
    price: "Product Price",
    productName: "Product Name",
    customerName: "Customer Name",
    quantity: "Quantity",
    total: "Grand Total",
  };

  const [searchType, setSearchType] = useState();
  const [select, setSelect] = useState(["All", "Productname", "Customername"]);
  const [filteredData, setFilteredData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    await axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        setData(res.data);
        setNewData(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("order"));

  const addOrder = async (newOrder) => {
  dispatch(add_Order(null))
  try {
    const response = await axios.post(
      "http://localhost:5000/api/orders",
      newOrder
    );
    // console.log(response.data);
    toast.success(response.data, {
      pauseOnHover: false,
    });
  } catch (error) {
    console.error(error.response.data);
    toast.error(error.response.data.error || "Error creating order");
  }
};


  if (newOrder != null) {
    addOrder(newOrder);
    // console.log(newProduct);
  }

  const removeOrder = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/orders/${id}`
      );
      const updatedData = data.filter((order) => order._id !== id);
      setData(updatedData);
      if (response.data && response.data.message) {
        toast.info(response.data.message, {
          pauseOnHover: false,
        });
        // console.log(response.data.message);
      } else if (response.data && typeof response.data === "string") {
        toast.info(response.data, {
          pauseOnHover: false,
        });
        // console.log(response.data);
      } else {
        console.warn("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        toast.error(error.response.data.error);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  useEffect(() => {
    handleFilterOrder(
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
        removeOrder={removeOrder}
        searchItem={searchItem}
      />
    </div>
  );
}
