import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from './hooks';

interface Test {
    mode: string;
    block: string;
    amount: string;
    timer: number;
}

const initialState = {} as Test;

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {}
})

export default testSlice.reducer;
export const {  } = testSlice.reducer;