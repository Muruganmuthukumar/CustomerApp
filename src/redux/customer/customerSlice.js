import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newCustomer:null,
  editingCustomer:null,
  updatedCustomer:null,
  deletingId:null,
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    edit_Customer:(state, action)=>{
      state.editingCustomer=action.payload;
    },
    updated_Customer:(state, action)=>{
      state.updatedCustomer=action.payload
    },
    delete_Customer:(state, action)=>{
      state.deletingId=action.payload;
    },
    add_customer:(state, action)=>{
      state.newCustomer=action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_customer, edit_Customer, delete_Customer, updated_Customer } = customerSlice.actions;

export default customerSlice.reducer; 