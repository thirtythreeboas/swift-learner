import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StateTypes } from '../types/state.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
const url = 'https://thirtythreeboas.github.io/wordsapi.github.io/data/dictionary.json';

export const getWords = createAsyncThunk('words/getWords',
  async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
})

const initialState = {
  data: {},
  chosenBlocks: [],
  mode: false,
  isLoading: false
} as StateTypes;

export const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    resetChosenBlocks: (state) => {
      state.chosenBlocks = [];
    },
    chooseWordsBlock: (state, action: PayloadAction<string>) => {
      console.log(action);
      if (state.chosenBlocks.indexOf(action.payload) === -1) {
        state.chosenBlocks.push(action.payload)
        return;
      }
      if (state.chosenBlocks.indexOf(action.payload) !== -1) {
        state.chosenBlocks = state.chosenBlocks.filter(elem => elem !== action.payload)
        return;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWords.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getWords.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export const { resetChosenBlocks, chooseWordsBlock } = wordSlice.actions

export default wordSlice.reducer;