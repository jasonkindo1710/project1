import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    RegisterStart: (state) => {
      state.register.isFetching = true;
    },
    RegisterSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    RegisterFailed: (state) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
    },
    RefreshStart: (state) => {
      state.register.isFetching = true;
    },
    RefreshSuccess: (state,action) => {
      state.login.currentUser.tokens = action.payload
      state.register.isFetching = false;
      state.register.error = false;
    },
    RefreshFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
    }

  },
});

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  RegisterStart,
  RegisterSuccess,
  RegisterFailed,
  RefreshSuccess,
  RefreshStart,
  RefreshFailed,
  logoutSuccess,
  calculateScore
} = authSlice.actions;

export default authSlice.reducer;
