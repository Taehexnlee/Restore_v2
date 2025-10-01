// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../../features/catalog/counterReducer";
import { catalogApi } from "../../features/catalog/catalogApi";
import catalogReducer from "../../features/catalog/catalogSlice";
import { uiSlice } from "../layout/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorApi } from "../../features/about/errorApi";
import { basketApi } from "../../features/basket/basketApi";

export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [errorApi.reducerPath] : errorApi.reducer,
    [basketApi.reducerPath] : basketApi.reducer,
    counter: counterReducer,
    ui: uiSlice.reducer,
    catalog: catalogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(catalogApi.middleware, errorApi.middleware, basketApi.middleware),
});

// 타입 정의 (TS 친화적 hooks용)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
