import React from 'react'

function SearchBox({handleSearch, searchItem, handleSearchType, select, setSearchType, setData, newData, setSearchItem}) {
    // console.log(select);
  return (
    <>
        <div className="search">
          <input
            type="text"
            placeholder="Type to Search..."
            onInput={(e) => handleSearch(e, setData, newData, setSearchItem)}
            value={searchItem}
          />
          <select name="" id="" onChange={(e)=>handleSearchType(e, setSearchType)}>
            {/* <option  value="all">
              All
            </option>
            {listType === "customer" && (
              <>
                <option value="firstname">Firstname</option>
                <option value="lastname">Lastname</option>
                <option value="email">Email</option>
                <option value="mobile">Mobile</option>
              </>
            )}
            {listType === "product" && (
              <>
                <option value="productname">Productname</option>
                <option value="brand">Brand</option>
              </>
            )}
            {listType === "order" && (
              <>
                <option value="customername">Customername</option>
                <option value="productname">Productname</option>
              </>
            )} */}
            {select.map((item, index)=>{
                return <>
                <option key={index} value={item}>{item}</option></>
            })}
          </select>
        </div>
    </>
  )
}

export default SearchBox