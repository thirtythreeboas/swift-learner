import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Test, TestResult} from '@/types/state';

const initialState = {
  results: {
    time: '',
    answers: [],
  },
  sourceLangCode: 'eng',
  targetLangCode: 'rus',
  isTestStarted: false,
  testFormat: true,
  wordNumber: 10,
  wordOrder: 0,
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
          time: '',
          answers: [],
        },
        isTestStarted: false,
        timeSpentOnTest: 0,
        currentWordIndex: 0,
        showResult: false,
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
    setFormat: (
      state,
      action: PayloadAction<{sourceLangCode: string; targetLangCode: string}>,
    ) => {
      return {
        ...state,
        sourceLangCode: action.payload.sourceLangCode,
        targetLangCode: action.payload.targetLangCode,
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
