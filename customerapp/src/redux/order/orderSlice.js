import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingOrder:null,
  updatedOrder:null,
  deletingId:null,
  listData:null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    edit_Order:(state, action)=>{
      state.editingOrder=action.payload;
    },
    updated_Order:(state, action)=>{
      state.updatedOrder=action.payload;
    },
    delete_Order:(state, action)=>{
      state.deletingId=action.payload;
    },
    orderListData:(state, action)=>{
      state.listData=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { edit_Order, updated_Order, delete_Order, orderListData } = orderSlice.actions;

export default orderSlice.reducer; 