import React, { useState } from "react";
import "../Styles/List.css";
import {
  FaCheckCircle,
  FaTrash,
  FaPen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { edit_Customer } from "../redux/customer/customerSlice";
import { edit_Product } from "../redux/product/productSlice";
import { useEffect } from "react";
import Card from "./Card";

export default function List({ toggle }) {
  const { list, listColumName, listType } = useSelector((state) => state.list);
  const [newList, setNewList] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setNewList([...list]);
  }, [list]);
  // console.log(list, listColumName, "type " + listType);
  // console.log(newList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = newList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % newList.length;
    setItemOffset(newOffset);
  };

  const handleEdit = (data) => {
    switch (listType) {
      case "customer":
        dispatch(edit_Customer(data));
        navigate("/customer-edit");
        break;
      case "product":
        console.log("Product Page", data);
        dispatch(edit_Product(data));
        navigate("/product-edit");
        break;
      case "order":
        console.log("order page");
        // dispatch(edit_Order(data));
        // navigate("/order-edit");
        break;
      default:
        break;
    }
  };
  const handleDelete = (data) => {
    const List = newList.filter((item) => item.id !== data.id);
    setNewList([...List]);
    setShow(!show);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <>
      {show && (
        <div>
          <Card
            handleDelete={handleDelete}
            data={data}
            show={show}
            setShow={setShow}
          />
        </div>
      )}
      <div
        className="pages-container"
        style={{ width: toggle ? "85vw" : "75vw" }}
      >
        <div className="list-top">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {listType === "customer" && (
              <h3>
                {newList.length !== 1 && newList.length !== 0
                  ? "customers"
                  : "customer"}
                ({newList.length})
              </h3>
            )}
            {listType === "product" && (
              <h3>
                {newList.length !== 1 && newList.length !== 0
                  ? "products"
                  : "product"}
                ({newList.length})
              </h3>
            )}
            {listType === "order" && (
              <h3>
                {newList.length !== 1 && newList.length !== 0
                  ? "order"
                  : "orders"}
                ({newList.length})
              </h3>
            )}
          </div>
          <div className="btn-container">
            <button>Add</button>
            <button>Search</button>
          </div>
        </div>

        {list.length === 0 ? (
          <>
            <h4>
              {/* {listType === "customer" && ""}
            {listType === "product" && "No Product To Display"}
            {listType === "order" && "No Order To Display"} */}
              This will take some time please wait...
            </h4>
            <span className="loader"></span>
          </>
        ) : (
          <>
            <div>
              <table>
                <thead>
                  {listType === "customer" && (
                    <tr>
                      <th></th>
                      <th>{listColumName.firstname}</th>
                      <th>{listColumName.lastname}</th>
                      <th>{listColumName.email}</th>
                      <th>{listColumName.mobile}</th>
                      <th>{listColumName.membership}</th>
                      <th>Actions</th>
                    </tr>
                  )}
                  {listType === "product" && (
                    <tr>
                      <th></th>
                      <th>{listColumName.title}</th>
                      <th>{listColumName.brand}</th>
                      <th>
                        {listColumName.price}&nbsp;(
                        <FaRupeeSign
                          style={{ height: "12px", width: "12px" }}
                        />
                        )
                      </th>
                      <th>{listColumName.rating}</th>
                      <th>{listColumName.stock}</th>
                      <th>Actions</th>
                    </tr>
                  )}
                  {listType === "order" && (
                    <tr>
                      <th></th>
                      <th>nothing</th>
                      <th>none</th>
                      <th>none</th>
                      <th>none</th>
                      <th>none</th>
                      <th>Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((data) => {
                      return (
                        <tr key={data.id}>
                          {listType === "customer" && (
                            <>
                              <td>
                                <img src={data.photoURL} alt="avatar" />
                              </td>
                              <td>{data.firstname}</td>
                              <td>{data.lastname}</td>
                              <td>{data.email}</td>
                              <td>{data.mobile}</td>
                              <td>
                                {data.membership ? (
                                  <FaCheckCircle className="member-icon" />
                                ) : (
                                  <FaCircleXmark className="member-icon" />
                                )}
                              </td>
                            </>
                          )}
                          {listType === "product" && (
                            <>
                              <td>
                                <img src={data.thumbnail} alt="product" />
                              </td>
                              <td>{data.title}</td>
                              <td>{data.brand}</td>
                              <td>{data.price}</td>
                              <td>{data.rating}</td>
                              <td>{data.stock}</td>
                            </>
                          )}
                          {listType === "order" && (
                            <>
                              <td>
                                <img src={data.photoURL} alt="avatar" />
                              </td>
                              <td>{data.firstname}</td>
                              <td>{data.lastname}</td>
                              <td>{data.email}</td>
                              <td>{data.mobile}</td>
                              <td>
                                {data.membership ? (
                                  <FaCheckCircle className="member-icon" />
                                ) : (
                                  <FaCircleXmark className="member-icon" />
                                )}
                              </td>
                            </>
                          )}

                          <td>
                            <button onClick={() => handleEdit(data)}>
                              <FaPen className="edit-icon icon" />
                              <span className="tooltip">Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                setData(data);
                                setShow(!show);
                              }}
                            >
                              <FaTrash className="delete-icon icon" />
                              <span className="tooltip">Delete</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {newList.length === 0 && (
                    <tr>
                      <td
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h4>
                          List is Empty, click
                          <span
                            onClick={refreshPage}
                            href="#"
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            value="Reload"
                          >
                            Reload
                          </span>
                          to fetch data
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={<FaChevronLeft className="prev-icon" />}
                nextLabel={<FaChevronRight className="next-icon" />}
                containerClassName={"pagination-container"}
                previousClassName={"prev-label"}
                nextClassName={"next-label"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
