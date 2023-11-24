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
    axios.get("http://localhost:5000/api/products").then((res) => {
      setData(res.data)
      setNewData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  dispatch(list(data));
  dispatch(listType("product"));

  const addProduct = async (newProduct) => {
    dispatch(add_Product(null));
    await axios.post("http://localhost:5000/api/products", newProduct)
      .then((res) => {
      // console.log(res.data)
        setData(res.data);
        fetchData();
    }).catch((err) => {
      console.log(err.response.data)
    })
  };

  if (newProduct != null) {
    addProduct(newProduct);
    // console.log(newProduct);
  }


  const removeProduct =async (id) => {
     await axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        const updatedData = data.filter((product) => product._id !== id);
        setData(updatedData);
        // console.log(updatedData);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
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
