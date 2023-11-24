import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:null,
  listColumName:null,
  listType:"",
  error:"",
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
    },
    setError:(state,action)=>{
      state.error=action.payload;
    }
  },
})

export const { list, listColumnName, listType, setError } = listSlice.actions;

export default listSlice.reducer;