import {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useAppSelector} from '@/app/hooks';
import {Breakpoints} from '@/types/breakpoints';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const BlockSize: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const wordSelector = useAppSelector((state) => state.words);
  const getNumberOfWordsInBlock = () => {
    const arr = wordSelector.chosenBlocks;
    const num = arr.reduce((acc, e) => acc + wordSelector.data[e].length, 0);
    return num;
  };

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Размер блока:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        {getNumberOfWordsInBlock()}
      </Grid>
    </>
  );
};
