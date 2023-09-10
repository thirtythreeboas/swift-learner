import { configureStore } from '@reduxjs/toolkit';
import { testSlice } from '../store/test';
import { wordSlice } from '../store/word';

export const store = configureStore({
  reducer: {
    words: wordSlice.reducer,
    test: testSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
