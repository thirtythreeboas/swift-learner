import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {BlockListElement, StateTypes, Word} from '../../types/state';
import {getWords, getWordBlock} from '../thunks';

const initialState = {
  blockList: [],
  chosenBlocks: null,
  wordBlock: [],
  mode: false,
  isLoading: false,
} as StateTypes;

export const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    resetChosenBlocks: (state) => {
      return {
        ...state,
        chosenBlocks: null,
        wordBlock: [],
      };
    },
    chooseWordBlock: (
      state,
      action: PayloadAction<BlockListElement>,
    ): StateTypes => {
      return {
        ...state,
        chosenBlocks: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getWords.fulfilled,
      (state, action: PayloadAction<BlockListElement[]>) => {
        state.blockList = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getWords.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getWordBlock.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getWordBlock.fulfilled,
      (state, action: PayloadAction<Word[]>) => {
        state.wordBlock = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getWordBlock.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {resetChosenBlocks, chooseWordBlock} = wordSlice.actions;

export default wordSlice.reducer;
