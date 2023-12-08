import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getWords, getBlockNames} from '@/store/vocabulary-data/action-creators';
import {NameSpace} from '@/const';
import {BlockListElement, Vocabulary, Word} from '../../types/state';

const initialState = {
  blockList: [],
  chosenBlock: null,
  wordBlock: [],
  mode: false,
  isLoading: false,
} as Vocabulary;

export const wordSlice = createSlice({
  name: NameSpace.WORDS,
  initialState,
  reducers: {
    resetChosenBlocks: (state) => {
      return {
        ...state,
        chosenBlock: null,
        wordBlock: [],
      };
    },
    setCurrentBlockName: (
      state,
      action: PayloadAction<BlockListElement>,
    ): Vocabulary => {
      return {
        ...state,
        chosenBlock: action.payload,
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
    builder.addCase(getBlockNames.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getBlockNames.fulfilled,
      (state, action: PayloadAction<Word[]>) => {
        state.wordBlock = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getBlockNames.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {resetChosenBlocks, setCurrentBlockName} = wordSlice.actions;

export default wordSlice.reducer;
