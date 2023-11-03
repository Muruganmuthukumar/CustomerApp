import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productList:null,
  productListCount:null,
  productListColumName:null,
  productListEmpty:null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productList:(state, action)=>{
        state.productList=action.payload;
    },
    productListColumName:(state, action)=>{
        state.productListColumName=action.payload
    },
    productListCount:(state, action)=>{
        state.productListCount=action.payload
    },
    productListEmpty:(state, action)=>{
        state.productListEmpty=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { productList, productListColumName, productListCount, productListEmpty } = productSlice.actions;

export default productSlice.reducer;