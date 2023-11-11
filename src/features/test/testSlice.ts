import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Test, Results} from '@/types/state';

const initialState = {
  results: {
    time: 0,
    data: [],
  },
  startTest: false,
  testFormat: true,
  wordAmount: 10,
  wordOrder: 1,
  timer: {
    showTime: false,
    time: 0,
  },
  index: 0,
  closeTestWindow: true,
  setTimer: null,
} as Test;

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    testLauncher: (state) => {
      return {
        ...state,
        startTest: true,
        timer: {
          ...state.timer,
          showTime: false,
        },
        closeTestWindow: true,
      };
    },
    setTime: (state) => {
      return {
        ...state,
        timer: {
          ...state.timer,
          time: state.timer.time + 1,
        },
      };
    },
    stopTest: (state) => {
      return {
        ...state,
        results: {
          ...state.results,
          data: [],
        },
        timer: {
          ...state.timer,
          time: 0,
        },
        startTest: false,
        index: 0,
      };
    },
    setWordNumber: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        wordAmount: action.payload,
      };
    },
    wordOrderSetter: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      const number = parseInt(action.payload, 10);
      console.log(number);
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
    setIndex: (state) => {
      return {
        ...state,
        index: state.index + 1,
      };
    },
    getTestResults: (state, action: PayloadAction<Results>) => {
      return {
        ...state,
        results: action.payload,
      };
    },
    manageTestRestart: (state) => {
      return {
        ...state,
        closeTestWindow: false,
        timer: {
          ...state.timer,
          showTime: true,
        },
      };
    },
  },
});

export default testSlice.reducer;

export const {
  testLauncher,
  stopTest,
  setWordNumber,
  wordOrderSetter,
  setFormat,
  setIndex,
  getTestResults,
  manageTestRestart,
  setTime,
} = testSlice.actions;
