import { createSlice } from "@reduxjs/toolkit";
import type { LoginResponse } from "./types";

interface UserState {
  user: LoginResponse | null;
}

const storedUser = localStorage.getItem("user");

const initialState: UserState = {
  user: storedUser ? JSON.parse(storedUser) : null, // because we are managing only one slice
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export const userReducer = userSlice.reducer;
