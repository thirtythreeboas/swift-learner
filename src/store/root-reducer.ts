import {combineReducers} from '@reduxjs/toolkit';
import {testSlice} from '@/store/test-process/test-process';
import {wordSlice} from '@/store/vocabulary-data/vocabulary-data';
import {NameSpace} from '@/const';

export const rootReducer = combineReducers({
  [NameSpace.WORDS]: wordSlice.reducer,
  [NameSpace.TEST]: testSlice.reducer,
});
