import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
// import type { RootState } from './index';

export interface Word {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
}

export interface Words {
  "Apple Juice": Word[],
  "Real Talk": Word[],
  "Winter is Coming": Word[],
  "Better than Others": Word[],
  "Upgrade"?: Word[],
  "Guru"?: Word[]
}

interface State {
  data: Words,
  chosenBlocks: string[],
  isLoading: boolean
}

const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

export const getWords = createAsyncThunk(
  'words/getWords',
  async () => {
    const response = await fetch(url);
    const resToJson = await response.json();
    return resToJson;
});
  
const initialState = {} as State;

// const words = {} as Words;

export const wordSlice = createSlice({
  name: 'words',
  initialState,
  // initialState: {
  //   words: words,
  //   chosenBlocks: [],
  //   isLoading: false
  // },
  reducers: {
    resetChosenBlocks: (state) => {
      state.chosenBlocks = [];
    },
    chooseWordsBlock: (state, action: React.MouseEvent<Element>) =>
      if (state.chosenBlocks.indexOf(action.target.id) === -1) {
        state.chosenBlocks.push(action.target.id);
        document.getElementById(action.target.id)!.className += " hover";
        return;
      }
      if (state.chosenBlocks.indexOf(action.target.id) !== -1) {
        document.getElementById(action.target.id)!.className = "word-block";
        state.chosenBlocks = state.chosenBlocks.filter((elem: string) => elem !== action.target.id);
        return;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWords.fulfilled, (state, action: any) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getWords.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export default wordSlice.reducer;
export const { resetChosenBlocks, chooseWordsBlock } = wordSlice.actions;