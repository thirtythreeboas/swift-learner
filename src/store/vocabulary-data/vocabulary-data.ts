import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  getVocabCategories,
  getVocabBlock,
} from '@/store/vocabulary-data/action-creators';
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
    builder.addCase(getVocabCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getVocabCategories.fulfilled,
      (state, action: PayloadAction<BlockListElement[]>) => {
        state.blockList = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getVocabCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getVocabBlock.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getVocabBlock.fulfilled,
      (state, action: PayloadAction<Word[]>) => {
        state.wordBlock = action.payload;
        state.isLoading = false;
      },
    );
    builder.addCase(getVocabBlock.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {resetChosenBlocks, setCurrentBlockName} = wordSlice.actions;

export default wordSlice.reducer;
