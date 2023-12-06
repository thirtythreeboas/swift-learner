import {combineReducers} from '@reduxjs/toolkit';
import {testSlice} from '@/store/test/testSlice';
import {wordSlice} from '@/store/word/wordSlice';
import {NameSpace} from '@/const';

export const rootReducer = combineReducers({
  [NameSpace.WORDS]: wordSlice.reducer,
  [NameSpace.TEST]: testSlice.reducer,
});
