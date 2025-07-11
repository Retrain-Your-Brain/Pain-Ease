import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAppState } from "./state";
import type { SideMenuOptions } from "./types";

export const AppSlice = createSlice({
    name: "App",
    initialState: getAppState(),
    reducers: {
        changeSideMenu: (state, action: PayloadAction<keyof typeof SideMenuOptions>) => {
            console.log(action);
            state.sideMenuOption = action.payload;
        }
    }
});

export const AppSliceReducer = AppSlice.reducer;
export const { changeSideMenu } = AppSlice.actions;
