import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin, userSignup, fetchItemList } from './productAPI';

const initialState = {
  isLoggedIn: false,
  name: "",
  userId: "",
  status: 'idle',
  sucSignup: false,
  itemList: [],
  itemDetails: {},
  cart:[],
  isShowCart: false,
};

export const userLoginThunk = createAsyncThunk(
  'user/userLogin',
  async (user) => {
    const response = await userLogin(user);
    return response.data;
  }
);

export const userSignupThunk = createAsyncThunk(
  'user/userSignup',
  async (user) => {
    const response = await userSignup(user);
    return response.data;
  }
);

export const fetchItemListThunk = createAsyncThunk(
  'user/itemList',
  async (userId) => {
    const response = await fetchItemList(userId);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'itemStore',
  initialState,
  reducers: {
    sucSignupFalse: (state) => {
      state.sucSignup = false;
    },
    setItemDetails: (state, action) => {
      state.itemDetails = action.payload;
    },
    removeItemDetails: (state) => {
      state.itemDetails = {};
    },
    addToCart: (state, action) => {
      debugger
      let found = false;
      state.cart.forEach((item, i)=>{
      if(item.item.name === action.payload.item.name){
        found = true;
        state.cart[i] = action.payload
      }
      })
      console.log(state.cart)
      debugger
      if(!found)
      state.cart.push(action.payload)
    },
    showHideCart: (state) => {
      state.isShowCart = !state.isShowCart;
    },
    removeFromCart: (state, action) => {
      state.cart.forEach((item, i)=>{
      if(item.item.name === action.payload){
        state.cart.splice(i, 1);
      }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.userId = action.payload.userId;
        state.isLoggedIn = true
        state.status = 'idle';
      })
      .addCase(userSignupThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.sucSignup = true;
        state.status = 'idle';
      })
      .addCase(fetchItemListThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemListThunk.fulfilled, (state, action) => {
        state.itemList = action.payload.data
        state.status = 'idle';
      })
  },
});

export const { sucSignupFalse, setItemDetails, removeItemDetails, addToCart, showHideCart, removeFromCart } = counterSlice.actions;

export const selectStore = (state) => state.itemStore;

export default counterSlice.reducer;
