import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
  target: string;
  input: string;
  answer: string[];
}

interface TestResults {
  time: number;
  data: Data[]
}

interface TimerManager {
  showTime: boolean;
  time: number;
}

interface TestLogic {
  results: TestResults;
  startTest: boolean;
  testFormat: boolean;
  wordAmount: number;
  wordOrder: number;
  timer: TimerManager;
  index: number;
  closeTestWindow: boolean;
  setTimer: null | NodeJS.Timer;
}

const initialState = {
  results: {
    time: 0,
    data: []
  },
  startTest: false,
  testFormat: true,
  wordAmount: 0,
  wordOrder: 1,
  timer: {
    showTime: false,
    time: 0
  },
  index: 0,
  closeTestWindow: true,
  setTimer: null
} as TestLogic;
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    testLauncher: (state: TestLogic) => {
      return {
        ...state,
        startTest: true,
        timer: {
          ...state.timer,
          showTime: false
        },
        closeTestWindow: true
      }
    },
    setTime: (state) => {
      return {
        ...state,
        timer: {
          ...state.timer,
          time: state.timer.time + 1
        }
      }
    },
    stopTest: (state: TestLogic) => {
      return {
        ...state,
        results: {
          ...state.results,
          data: []
        },
        timer: {
          ...state.timer,
          time: 0
        },
        startTest: false,
        wordAmount: 0,
        index: 0
      }
    },
    getWordCount: (state: TestLogic, action: PayloadAction<number>) => {
      return {
        ...state,
        wordAmount: action.payload
      };
    },
    wordOrderSetter: (state: TestLogic, action: PayloadAction<string>) => {
      let number = parseInt(action.payload, 10);
      return {
        ...state,
        wordOrder: number
      };
    },
    setFormat: (state: TestLogic) => {
      return {
        ...state,
        testFormat: !state.testFormat
      }
    },
    setIndex: (state) => {
      return {
        ...state,
        index: state.index + 1
      }
    },
    getTestResults: (state, action: PayloadAction<TestResults>) => {
      return {
        ...state,
        results: action.payload,
        
      }
    },
    manageTestRestart: (state) => {
      return {
        ...state,
        closeTestWindow: false,
        timer: {
          ...state.timer,
          showTime: true
        }
      }
    }
  }
});

export default testSlice.reducer;

export const {
  testLauncher,
  stopTest,
  getWordCount,
  wordOrderSetter,
  setFormat,
  setIndex,
  getTestResults,
  manageTestRestart,
  setTime
 } = testSlice.actions;