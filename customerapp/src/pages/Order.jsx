import React, { useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listColumnName, listType } from "../redux/List/listSlice";
import { useEffect } from "react";
import { delete_Order, updated_Order } from "../redux/order/orderSlice";
import {
  handleFilterOrder,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";

export default function Order({ toggle }) {
  const { updatedOrder, deletingId, listData } = useSelector(
    (state) => state.order
  );
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
    try {
      const response = await fetch("https://customer-vwy2.onrender.com/orders");
      const data = await response.json();
      setData(data);
      setNewData(data);
    } catch (err) {
      console.error("Error Fetching Orders Data", err);
    }
  }
  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("order"));
  
  const updateOrder = async (orderData) => {
    try {
      const response = await fetch(
        `https://customer-vwy2.onrender.com/orders/${orderData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      const editedOrder = await response.json();
      const result = listData.map((item) =>
      item.id === editedOrder.id ? editedOrder : item
      );
      setData(result);
      dispatch(updated_Order(null));
      fetchData();
    } catch (error) {
      console.error("Error Updating Data", error);
    }
  };
  useEffect(() => {
    if (updatedOrder != null) {
      updateOrder(updatedOrder);
    }
  }, [updatedOrder]);

  const removeOrder = (orderId) => {
    fetch(`https://customer-vwy2.onrender.com/orders/${orderId}`, {
      method: "DELETE",
    })
    .then(() => {
      const removedOrder = data.filter((data) => data.id !== orderId); //id only
      // console.log(removedOrder);
      setData(removedOrder);
      fetchData();
        dispatch(delete_Order(null));
      })
      .catch((error) => console.error("Error Deleting Data", error));
  };

  if (deletingId != null) {
    console.log(deletingId);
    removeOrder(deletingId);
  }

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
      />
    </div>
  );
}
