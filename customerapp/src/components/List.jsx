import React, { useEffect, useState } from "react";
import "../Styles/List.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customerListData,
  delete_Customer,
  edit_Customer,
} from "../redux/customer/customerSlice";
import { delete_Product, edit_Product, productListData } from "../redux/product/productSlice";
import Card from "./Card";
import { delete_Order, edit_Order, orderListData } from "../redux/order/orderSlice";
import Table from "./Table";
import ListTop from "./ListTop";
// import { setError } from "../redux/List/listSlice";

export default function List({
  toggle,
  handleSearch,
  select,
  handleSearchType,
  setSearchType,
  setFilterData,
  newData,
  setSearchItem,
  removeCustomer,
}) {
  const { list, listColumName, listType } = useSelector((state) => state.list);
  const [show, setShow] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [newList, setNewList] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = newList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    try {
      setNewList([...list]);
      setData([...list]);
      // console.log(newList,"newList");
    } catch (err) {
      // dispatch(setError("List is Empty"))
      console.log("List is Empty", err);
    }
  }, [list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleEdit = (data) => {
    switch (listType) {
      case "customer":
        navigate(`/${data._id}/customer-edit`);
        break;
      case "product":
        dispatch(edit_Product(data));
        dispatch(productListData(newList));
        navigate("/product-edit");
        break;
      case "order":
        console.log("order page", data);
        dispatch(edit_Order(data));
        dispatch(orderListData(newList));
        navigate("/order-edit");
        break;
      default:
        break;
    }
  };
  const handleDelete = (id) => {
    switch (listType) {
      case "customer":
        removeCustomer(id);
        setShow(!show);
        break;
      case "product":
        dispatch(delete_Product(data.id));
        setShow(!show);
        break;
      case "order":
        dispatch(delete_Order(data.id));
        setShow(!show);
        break;
      default:
        break;
    }
  };

  const handleCreate = () => {
    switch (listType) {
      case "customer":
        navigate("/new-customer");
        break;
      case "product":
        navigate("/new-product");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {show && (
        <div>
          <Card
            handleDelete={handleDelete}
            id={deletingId}
            show={show}
            setShow={setShow}
          />
        </div>
      )}
      <div
        className="pages-container"
        style={{ width: toggle ? "85vw" : "75vw" }}
      >
        <ListTop
          list={list}
          listType={listType}
          data={data}
          handleSearch={handleSearch}
          handleSearchType={handleSearchType}
          handleCreate={handleCreate}
          select={select}
          setSearchType={setSearchType}
          setData={setFilterData}
          newData={newData}
          setSearchItem={setSearchItem}
        />
        <Table
          list={list}
          listType={listType}
          listColumName={listColumName}
          handleEdit={handleEdit}
          currentItems={currentItems}
          setDeletingId={setDeletingId}
          setShow={setShow}
          show={show}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </div>
    </>
  );
}
