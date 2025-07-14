import { configureStore } from "@reduxjs/toolkit";;
import { AppSliceReducer } from "./appSlice";
import { useSelector, useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { errorSliceReducer } from "./errorSlice";
import { userReducer } from "./userSlice";

export const store = configureStore({
    reducer: {
        app: AppSliceReducer,
        error: errorSliceReducer,
        user:userReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;