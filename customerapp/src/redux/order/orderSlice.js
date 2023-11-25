import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editingOrder:null,
  newOrder:null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    edit_Order:(state, action)=>{
      state.editingOrder=action.payload;
    },
    add_Order: (state, action) => {
      state.newOrder = action.payload;
    }
  },
})

export const { edit_Order, add_Order } = orderSlice.actions;

export default orderSlice.reducer; 