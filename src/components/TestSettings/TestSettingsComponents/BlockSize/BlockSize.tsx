import {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useAppSelector} from '@/app/hooks';

export const BlockSize: FC = () => {
  const wordSelector = useAppSelector((state) => state.words);
  const getNumberOfWordsInBlock = () => {
    const arr = wordSelector.chosenBlocks;
    const num = arr.reduce((acc, e) => acc + wordSelector.data[e].length, 0);
    return num;
  };

  return (
    <>
      <Grid item xs={2} md={2} lg={2}>
        Размер блока:
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        {getNumberOfWordsInBlock()}
      </Grid>
    </>
  );
};
