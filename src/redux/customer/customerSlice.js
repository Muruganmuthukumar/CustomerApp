import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customerList:[],
  customerListCount:null,
  customerListColumName:null,
  customerListEmpty:null,
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerList:(state, action)=>{
        state.customerList=action.payload;
    },
    customerListColumName:(state, action)=>{
        state.customerListColumName=action.payload
    },
    customerListCount:(state, action)=>{
        state.customerListCount=action.payload
    },
    customerListEmpty:(state, action)=>{
        state.customerListEmpty=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { customerList, customerListColumName, customerListCount, customerListEmpty } = customerSlice.actions;

export default customerSlice.reducer; 