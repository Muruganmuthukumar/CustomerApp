import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newProduct: null,
  editingProduct: null,
  updatedProduct: null,
  deletingId: null,
  listData: null,

}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    edit_Product: (state, action) => {
      state.editingProduct = action.payload
    },
    add_Product: (state, action) => {
      state.newProduct = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { edit_Product, add_Product } = productSlice.actions;

export default productSlice.reducer;