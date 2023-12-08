import {BlockListElement, WordBlock} from '@/types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '@/services/api';

export const getWords = createAsyncThunk(
  'words/getWords',
  async (_, thunkAPI) => {
    try {
      const response = await API.get<BlockListElement[]>('/blockList');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить слова');
    }
  },
);

export const getBlockNames = createAsyncThunk(
  'words/getBlockNames',
  async (wordBlock: string, thunkAPI) => {
    try {
      const response = await API.get<WordBlock>(`/${wordBlock}`);
      return response.data.words;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        `Не удалось загрузить блок слов ${wordBlock}`,
      );
    }
  },
);
