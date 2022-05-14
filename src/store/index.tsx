import { configureStore } from "@reduxjs/toolkit";
import { wordSlice } from "./word";
import { testSlice } from "./test";

const store = configureStore({
  reducer: {
    wordStore: wordSlice.reducer,
    testStore: testSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectWords = (state: RootState) => state.wordStore;
export const selectTest = (state: RootState) => state.testStore;
export default store;