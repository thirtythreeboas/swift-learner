import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Test, TestResult} from '@/types/state';

const initialState = {
  // results: {
  //   time: '',
  //   answers: [],
  // },
  results: {
    time: '00:27',
    answers: [
      {
        word: 'can',
        userAnswer: 'мочь',
        correctAnswer: ['мочь', 'уметь'],
      },
      {
        word: 'send',
        userAnswer: 'отправлять',
        correctAnswer: ['отправлять', 'посылать'],
      },
      {
        word: 'need',
        userAnswer: 'надо',
        correctAnswer: ['надо', 'нужно', 'нуждаться'],
      },
      {
        word: 'want',
        userAnswer: 'зотеть',
        correctAnswer: ['хотеть'],
      },
      {
        word: 'look',
        userAnswer: 'смотреть',
        correctAnswer: ['смотреть'],
      },
      {
        word: 'listen to',
        userAnswer: 'слушать ктого-то что-то',
        correctAnswer: ['слушать что-то/кого-то'],
      },
      {
        word: 'smile',
        userAnswer: 'удышьбся',
        correctAnswer: ['улыбаться', 'улыбка'],
      },
      {
        word: 'happy',
        userAnswer: 'счастливый',
        correctAnswer: ['счастливый'],
      },
      {
        word: 'sad',
        userAnswer: 'грустный',
        correctAnswer: ['грустный'],
      },
      {
        word: 'because',
        userAnswer: 'потому что',
        correctAnswer: ['потому что'],
      },
    ],
  },
  sourceLangCode: 'eng',
  targetLangCode: 'rus',
  // isTestStarted: false,
  isTestStarted: true,
  testFormat: true,
  wordNumber: 10,
  wordOrder: 0,
  timeSpentOnTest: 0,
  currentWordIndex: 0,
  // showResult: false,
  showResult: true,
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
