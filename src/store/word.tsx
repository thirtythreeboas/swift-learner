import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './index';

export interface Word {
  rus: string[];
  eng: string[];
  isCorrect: boolean;
  point: number;
  hint: string;
}

export interface Words {
  "Apple Juice": Word[];
  "Real Talk": Word[];
  "Winter is Coming": Word[];
  "Better than Others": Word[];
  "Upgrade"?: Word[];
  "Guru"?: Word[];
}

const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

export const getWords = createAsyncThunk(
  'words/getWords',
  async () => {
    const response = await fetch(url);
    const resToJson = await response.json();
    return resToJson;
});

const initialState: { [key: string] : any } = {
  data: {} as Words,
  chosenBlocks: [],
  mode: false,
  isLoading: false
}

export const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    resetChosenBlocks: (state) => {
      state.chosenBlocks = [];
    },
    chooseWordsBlock: (state, action: PayloadAction<string>) => {
      if (state.chosenBlocks.indexOf(action.payload) === -1) {
        state.chosenBlocks.push(action.payload);
        document.getElementById(action.payload)!.className += " hover";
        return;
      }
      if (state.chosenBlocks.indexOf(action.payload) !== -1) {
        document.getElementById(action.payload)!.className = "word-block";
        state.chosenBlocks = state.chosenBlocks.filter((elem: string) => elem !== action.payload);
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