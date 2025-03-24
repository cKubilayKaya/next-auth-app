import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload.user;
      state.token = null;
      state.isAuthenticated = false;
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      document.cookie = `token=${action.payload.token}; path=/; max-age=${process.env.TOKEN_EXPIRATION}; SameSite=Strict`;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();

  const loginAction = useCallback(
    (userData) => {
      dispatch(login(userData));
    },
    [dispatch]
  );
  const registerAction = useCallback(
    (userData) => {
      dispatch(register(userData));
    },
    [dispatch]
  );

  const logoutAction = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { loginAction, logoutAction, registerAction };
};

export default authSlice.reducer;
