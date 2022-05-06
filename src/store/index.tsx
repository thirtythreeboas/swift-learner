import { configureStore } from "@reduxjs/toolkit";
import { wordSlice } from "./word";

const store = configureStore({
  reducer: {
    wordStorage: wordSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectWords = (state: RootState) => state.wordStorage.data;
export default store;