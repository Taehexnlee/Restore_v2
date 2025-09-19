// features/catalog/counterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CounterState = {
  data: number;
};

const initialState: CounterState = {
  data: 42,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      state.data += action.payload ?? 1; // 기본값 1
    },
    decrement: (state, action: PayloadAction<number | undefined>) => {
      state.data -= action.payload ?? 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;