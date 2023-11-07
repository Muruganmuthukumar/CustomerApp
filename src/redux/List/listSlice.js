import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:null,
  listColumName:null,
  listType:'',
  loading:false,
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    list:(state, action)=>{
        state.list=action.payload;
    },
    listColumnName:(state, action)=>{
        state.listColumName=action.payload
    },
    listType:(state, action)=>{
        state.listType=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { list, listColumnName, listType } = listSlice.actions;

export default listSlice.reducer;