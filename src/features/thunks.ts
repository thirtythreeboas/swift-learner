import {createAsyncThunk} from '@reduxjs/toolkit';
import {Vocabulary} from '@/types/words';
import axios from 'axios';

const url =
  'https://thirtythreeboas.github.io/wordsapi.github.io/data/dictionary.json';

export const getWords = createAsyncThunk(
  'words/getWords',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Vocabulary>(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить слова');
    }
  },
);
