import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Test, UserAnswersList} from '@/types/state';
import {NameSpace} from '@/const';

const initialState = {
  results: [],
  sourceLangCode: 'eng',
  targetLangCode: 'rus',
  isTestStarted: false,
  testFormat: true,
  wordNumber: 10,
  wordOrder: 'sequential',
  timeSpentOnTest: 0,
  currentWordIndex: 0,
  showResult: false,
} as Test;

export const testSlice = createSlice({
  name: NameSpace.TEST,
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
        results: [],
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
      return {
        ...state,
        wordOrder: action.payload,
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
    setResult: (state, action: PayloadAction<UserAnswersList>) => {
      return {
        ...state,
        results: [...state.results, action.payload],
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
