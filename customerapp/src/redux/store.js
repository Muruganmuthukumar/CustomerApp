import { combineReducers, configureStore } from '@reduxjs/toolkit';
import listReducer from './List/listSlice';
import customerReducer from './customer/customerSlice';
import productReducer from './product/productSlice';
import orderReducer from './order/orderSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  list: listReducer,
  customer: customerReducer,
  product:productReducer,
  order:orderReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1, 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer : persistedReducer, //we should remove curly brackets
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)