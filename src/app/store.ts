import {configureStore} from '@reduxjs/toolkit';
import {testSlice} from '../store/test/testSlice';
import {wordSlice} from '../store/word/wordSlice';

export const store = configureStore({
  reducer: {
    words: wordSlice.reducer,
    test: testSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
