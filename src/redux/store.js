import { configureStore } from '@reduxjs/toolkit';
import listReducer from './List/listSlice';


export const store = configureStore({
  reducer: {
    list:listReducer
  },
})