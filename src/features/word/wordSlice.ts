import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {StateTypes} from '../../types/state';
import {getWords} from '../thunks';

const initialState = {
  data: {},
  chosenBlocks: ['Apple Juice'],
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
        chosenBlocks: [],
      };
    },
    chooseWordsBlock: (state, action: PayloadAction<string>): StateTypes => {
      if (state.chosenBlocks.indexOf(action.payload) === -1) {
        return {
          ...state,
          chosenBlocks: [...state.chosenBlocks, action.payload],
        };
      }
      return {
        ...state,
        chosenBlocks: state.chosenBlocks.filter(
          (elem) => elem !== action.payload,
        ),
      };
    },
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
  },
});

export const {resetChosenBlocks, chooseWordsBlock} = wordSlice.actions;

export default wordSlice.reducer;
