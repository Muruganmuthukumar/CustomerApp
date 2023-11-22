import React, { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listType } from "../redux/List/listSlice";
import {
  add_customer,
} from "../redux/customer/customerSlice";
import {
  handleFilterCustomer,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";

export default function Customer({ toggle }) {
  const { newCustomer } = useSelector(
    (state) => state.customer
  ); //
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

  async function fetchData() {
    await axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        setData(res.data);
        setNewData(res.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err.respose.data);
      });
  }
  dispatch(list(data));
  dispatch(listType("customer"));

  // console.log(data);

  const addCustomer = async (newCustomer) => {
    dispatch(add_customer(null));
    console.log(newCustomer);
    await axios
      .post("http://localhost:5000/api/users", newCustomer)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        // console.log(res);
        fetchData();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  if (newCustomer != null) {
    addCustomer(newCustomer);
  }


  const removeCustomer = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`).then(() => {
      const updatedData = data.filter((user) => user._id !== id);
      setData(updatedData);
      // console.log(updatedData);
    }).catch((err) => {
      console.log(err.response.data);
    });
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
          />
        </div>
      </div>
    </>
  );
}
