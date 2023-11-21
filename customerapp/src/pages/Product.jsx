import { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import { list, listColumnName, listType } from "../redux/List/listSlice";
import {
  updated_Product,
  delete_Product,
  add_Product,
} from "../redux/product/productSlice";
import {
  handleFilterProduct,
  handleSearch,
  handleSearchType,
} from "../utils/SearchFilter";

export default function Product({ toggle }) {
  const { updatedProduct, deletingId, newProduct } = useSelector(
    (state) => state.product
  );
  const { listData } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
    title: "Product Name",
    rating: "Rating",
    brand: "Brand",
    stock: "Stock",
    price: "Price",
  };
  const [searchType, setSearchType] = useState();
  const [select, setSelect] = useState(["All", "Productname", "Brand"]);
  const [filteredData, setFilteredData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await fetch(
        "https://customer-vwy2.onrender.com/products"
      );
      const data = await response.json();
      setData(data);
      setNewData(data);
    } catch (err) {
      console.log("Error Fetching Products Data", err);
    }
  }

  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("product"));

  const addProduct = async (newProduct) => {
    dispatch(add_Product(null));
    try {
      const response = await fetch(
        "https://customer-vwy2.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );
      const newData = await response.json();
      setData(newData);
      fetchData();
    } catch (err) {
      console.log("Error Adding Data", err);
    }
  };

  if (newProduct != null) {
    addProduct(newProduct);
    // window.location.reload(false);
    console.log(newProduct);
  }

  const updateProduct = async (productData) => {
    try {
      const response = await fetch(
        `https://customer-vwy2.onrender.com/products/${productData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );
      const editedProduct = await response.json();
      const result = listData.map((item) =>
        item.id === editedProduct.id ? editedProduct : item
      );
      setData(result);
      // console.log(editedProduct,"data");
      // console.log(result);
      dispatch(updated_Product(null));
    } catch (error) {
      console.error("Error Updating Data", error);
    }
  };

  if (updatedProduct !== null) {
    updateProduct(updatedProduct);
    // console.log(updatedProduct);
  }

  const removeProduct = (productId) => {
    fetch(`https://customer-vwy2.onrender.com/products/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        const removedProduct = listData.filter((data) => data.id !== productId); //id only
        // console.log(removedProduct);
        setData(removedProduct);
        fetchData();
        dispatch(delete_Product(null));
      })
      .catch((error) => console.error("Error Deleting Data", error));
  };

  if (deletingId !== null) {
    // console.log(deletingId);
    removeProduct(deletingId);
  }

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
          />
        </div>
      </div>
    </>
  );
}
