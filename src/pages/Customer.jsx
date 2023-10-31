import React, { useEffect, useState } from "react";
import "../Styles/Customer.css";
import { FaCheckCircle, FaTrash, FaPen } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
 
export default function Customer({
  editingItem,
  setEditingItem,
  toggle,
  setToggle,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // console.log("data",data.length);
    // console.log("currentItems",currentItems.length);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network issue!");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error Fetching Data: ", error));
  }, []);

  const handleEdit = (data) => {
    console.log(data);
    setEditingItem(data);
    navigate('/customer-edit')
    };

  return (
    <>
      <div
        className="cust-container"
        style={{ width: toggle ? "1200px" : "1050px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3>
            {data.length !== 1 && data.length !== 0 ? "Customers" : "Customer"}{" "}
            ({data.length})
          </h3>
          <ReactPaginate
            previousLabel={<BiChevronLeftCircle className="prev-icon" />}
            nextLabel={<BiChevronRightCircle className="next-icon" />}
            containerClassName={"pagination-container"}
            previousClassName={"prev-label"}
            nextClassName={"next-label"}
            pageClassName={"current-page"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Membership</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((data) => {
                return (
                  <tr key={data.id}>
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
        {data.length === 0 ? (
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
            No Customer to Display
          </h4>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
