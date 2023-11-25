import { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listType, setError } from "../redux/List/listSlice";
import {
  delete_Product,
  add_Product,
} from "../redux/product/productSlice";
import {
  handleFilterProduct,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Product({ toggle }) {
  const { deletingId, newProduct } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState();
  const [select, setSelect] = useState(["All", "Productname", "Brand","Category"]);
  const [filteredData, setFilteredData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
async function fetchData() {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    setData(response.data);
    setNewData(response.data);
  } catch (error) {
    console.error("Error fetching product data:", error.message);
    if (error.response) {
      console.error(error.response.data);
      toast.error(error.response.data.error || "Error fetching product data");
    } else if (error.request) {
      console.error(error.request);
      toast.error("Error fetching product data");
    } else {
      console.error("Error", error.message);
      toast.error("Error fetching product data");
    }
  }
}

  dispatch(list(data));
  dispatch(listType("product"));

const addProduct = async (newProduct) => {
  dispatch(add_Product(null));
  try {
    const response = await axios.post(
      "http://localhost:5000/api/products",
      newProduct
    );
    fetchData();
    // console.log(response.data)
    toast.success(response.data, {
      pauseOnHover:false
    })
  } catch (err) {
    console.log(err.response.data);
  }
};

if (newProduct != null) {
  addProduct(newProduct);
  // console.log(newProduct);
}

const removeProduct = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );
    const updatedData = data.filter((product) => product._id !== id);
    setData(updatedData);

    if (typeof response.data === "string") {
      toast.info(response.data, {
        pauseOnHover: false,
      });
      console.log(response.data); 
    } else if (response.data.message) {
      toast.info(response.data.message, {
        pauseOnHover: false,
      });
      console.log(response.data.message); 
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
    handleFilterProduct(
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
            removeProduct={removeProduct}
            searchItem={searchItem}
          />
        </div>
      </div>
    </>
  );
}
