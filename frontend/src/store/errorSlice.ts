import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  messages: string[];
}

const initialState: ErrorState = {
  messages: [],
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    removeError: (state, action: PayloadAction<number>) => {
      state.messages.splice(action.payload, 1);
    },
    clearErrors: (state) => {
      state.messages = [];
    },
  },
});

export const errorSliceReducer = errorSlice.reducer;
export const { addError, removeError, clearErrors } = errorSlice.actions;
