import {BlockListElement, WordBlock} from '@/types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-type': 'application/json',
  },
});

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

export const getWordBlock = createAsyncThunk(
  'words/getWordBlock',
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
