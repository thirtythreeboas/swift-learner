import {BlockListElement} from '@/types/state';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const vocabulary = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
  endpoints: (builder) => ({
    getWordBlockList: builder.query<BlockListElement, string>({
      query: (blockListName) => blockListName,
    }),
  }),
});
