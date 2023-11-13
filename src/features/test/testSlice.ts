import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Test, TestResult} from '@/types/state';

const initialState = {
  results: {
    time: '',
    data: [],
  },
  isTestStarted: false,
  testFormat: true,
  wordNumber: 2,
  wordOrder: 1,
  timeSpentOnTest: 0,
  currentWordIndex: 0,
  showResult: false,
} as Test;

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    startTest: (state) => {
      return {
        ...state,
        isTestStarted: true,
      };
    },
    setTime: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        timeSpentOnTest: action.payload,
      };
    },
    restartTest: (state) => {
      return {
        ...state,
        results: {
          ...state.results,
          data: [],
        },
        timeSpentOnTest: 0,
        isTestStarted: false,
        currentWordIndex: 0,
      };
    },
    setWordNumber: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        wordNumber: action.payload,
      };
    },
    setWordOrder: (state, action: PayloadAction<string>) => {
      const number = parseInt(action.payload, 10);
      return {
        ...state,
        wordOrder: number,
      };
    },
    setFormat: (state) => {
      return {
        ...state,
        testFormat: !state.testFormat,
      };
    },
    setNextWord: (state) => {
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
      };
    },
    setResult: (state, action: PayloadAction<TestResult>) => {
      return {
        ...state,
        results: action.payload,
      };
    },
    completeTest: (state) => {
      return {
        ...state,
        showResult: true,
      };
    },
  },
});

export default testSlice.reducer;

export const {
  startTest,
  restartTest,
  setWordNumber,
  setWordOrder,
  setFormat,
  setNextWord,
  setResult,
  completeTest,
  setTime,
} = testSlice.actions;
