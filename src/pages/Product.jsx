import { useEffect, useState } from "react";
import List from "../components/List";
import { useDispatch } from "react-redux";
import {
  list,
  listColumnName,
  listCount,
  listType,
} from "../redux/List/listSlice";

export default function Product({toggle}) {
  const [data, setData] = useState([]);
  const columnName = {
      title: "Product Name",
      rating: "Ratings",
      brand: "Brand",
      stock: "Stock",
      price: "Price(INR)",
  };

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log("Error Fetching Products Data", err);
      }
    }
    fetchData();
  }, []);

  dispatch(list(data));
  dispatch(listCount("Product"));
  dispatch(listColumnName(columnName));
  dispatch(listType("product"));

  return (
    <>
      <List toggle={toggle}/>
    </>
  );
}
