import React from "react";
import {
  FaCheckCircle,
  FaTrash,
  FaPen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

function Table({
  list,
  listType,
  listColumName,
  handleEdit,
  currentItems,
  setEditingData,
  setShow,
  show,
  pageCount,
  handlePageClick,
}) {

  const {error}=useSelector((state)=>state.list)

  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <>
      {list.length === 0 ? (
        <>
          <h4>
            {listType === "customer" && "No Customer To Display"}
            {listType === "product" && "No Product To Display"}
            {listType === "order" && "No Order To Display"}
            <br />
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
                    <th>Avatar</th>
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
                    <th>Product</th>
                    <th>{listColumName.title}</th>
                    <th>{listColumName.brand}</th>
                    <th>
                      {listColumName.price}&nbsp;(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    <th>{listColumName.rating}</th>
                    <th>{listColumName.stock}</th>
                    <th>Actions</th>
                  </tr>
                )}
                {listType === "order" && (
                  <tr>
                    <th>Product</th>
                    <th>
                      {listColumName.price}(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    <th>{listColumName.productName}</th>
                    <th>{listColumName.customerName}</th>
                    <th>{listColumName.quantity}</th>
                    <th>
                      {listColumName.total}(
                      <FaRupeeSign style={{ height: "12px", width: "12px" }} />)
                    </th>
                    <th>Order Status</th>
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
                            <td style={{ maxWidth: "150px" }}>{data.title}</td>
                            <td>{data.brand}</td>
                            <td>{data.price}</td>
                            <td>{data.rating}</td>
                            <td>{data.stock}</td>
                          </>
                        )}
                        {listType === "order" && (
                          <>
                            <td>
                              <img src={data.thumbnail} alt="product" />
                            </td>
                            <td style={{ paddingLeft: "50px" }}>
                              {data.price}
                            </td>
                            <td style={{ maxWidth: "100px" }}>
                              {data.productName}
                            </td>
                            <td>{data.customerName}</td>
                            <td>
                              {data.quantity}
                              <span style={{ fontSize: "12px" }}>x</span>
                            </td>
                            <td>{data.price * data.quantity}</td>
                            <td className="success">Success</td>
                          </>
                        )}

                        <td>
                          <button onClick={() => handleEdit(data)}>
                            <FaPen className="edit-icon icon" />
                            <span className="tooltip">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingData(data);
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
                {list.length === 0 && (
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
    </>
  );
}

export default Table;
