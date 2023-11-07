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

export default function List({ toggle }) {
  const { list, listColumName, listType } = useSelector((state) => state.list);
  // console.log(list, listColumName, "type " + listType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = list.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(list.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
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

  return (
    <>
      <div
        className="pages-container"
        style={{ width: toggle ? "85vw" : "75vw" }}
      >
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
              {list.length !== 1 && list.length !== 0
                ? "customers"
                : "customer"}
              ({list.length})
            </h3>
          )}
          {listType === "product" && (
            <h3>
              {list.length !== 1 && list.length !== 0 ? "products" : "product"}(
              {list.length})
            </h3>
          )}
          {listType === "order" && (
            <h3>
              {list.length !== 1 && list.length !== 0 ? "order" : "orders"}(
              {list.length})
            </h3>
          )}
        </div>

        {list.length === 0 ? (
          <h4
            style={{
              color: "#000",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "10px",
              width: "100%",
              marginLeft: "0px",
            }}
          >
            {listType === "customer" && "No Customer To Display"}
            {listType === "product" && "No Product To Display"}
            {listType === "order" && "No Order To Display"}
          </h4>
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
                      <th>{listColumName.price}&nbsp;(<FaRupeeSign style={{height:"12px", width:"12px"}}/>)</th>
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
                            <button>
                              <FaTrash className="delete-icon icon" />
                              <span className="tooltip">Delete</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
