import { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch, useSelector } from "react-redux";
import {
  list,
  listColumnName,
  listType,
} from "../redux/List/listSlice";
import { updated_Product } from "../redux/product/productSlice";

export default function Product({toggle}) {
  const { updatedProduct } = useSelector((state)=>state.product)
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const columnName = {
      title: "Product Name",
      rating: "Rating",
      brand: "Brand",
      stock: "Stock", 
      price: "Price",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://customer-vwy2.onrender.com/products");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log("Error Fetching Products Data", err);
      }
    }
    fetchData();
  }, []);

  dispatch(list(data));
  dispatch(listColumnName(columnName));
  dispatch(listType("product"));

  const updateProducts = async (productData) => {
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
      const newData = response.json();
      setData(data.map((item) => (item.id === productData.id ? newData : item)));
      dispatch(updated_Product(null));
    } catch (error) {
      console.error("Error Updating Data", error);
    }
  };
  if(updatedProduct!=null){
    updateProducts(updatedProduct);
    // console.log(updatedCustomer,"updated Customer");
  }

  return (
    <>
    <div>
      <div>
        <List toggle={toggle}/>
      </div>
    </div>
    </>
  );
}
