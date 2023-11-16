import React from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import SearchBox from "./SearchBox";

function ListTop({
  list,
  listType,
  data,
  handleSearch,
  handleSearchType,
  searchItem,
  handleCreate,
  select,
  setSearchType,
  setData,
  newData,
  setSearchItem,
}) {
  return (
    <>
      <div className="list-top">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            marginLeft: "-20px",
          }}
        >
          {listType === "customer" && (
            <h3>
              {data.length !== 1 && list.length !== 0
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
              {list.length !== 1 && list.length !== 0 ? "orders" : "order"}(
              {list.length})
            </h3>
          )}
        </div>
        <SearchBox
          handleSearch={handleSearch}
          searchItem={searchItem}
          handleSearchType={handleSearchType}
          listType={listType}
          select={select}
          setSearchType={setSearchType}
          setData={setData}
          newData={newData}
          setSearchItem={setSearchItem}
        />
        <div className="btn-container">
          <button disabled={listType === "order"} onClick={handleCreate}>
            {listType === "customer" && <IoPersonAddSharp className="icon" />}
            {listType === "product" && (
              <AiOutlineAppstoreAdd className="icon" />
            )}
            {listType === "order" && <VscAdd className="icon" />}
          </button>
        </div>
      </div>
    </>
  );
}

export default ListTop;
