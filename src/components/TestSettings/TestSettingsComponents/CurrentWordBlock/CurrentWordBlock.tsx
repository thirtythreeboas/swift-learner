import {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useAppSelector} from '@/app/hooks';
import {Breakpoints} from '@/types/breakpoints';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const CurrentWordBlock: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const wordSelector = useAppSelector((state) => state.words);

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Блок
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        {wordSelector.chosenBlocks}
      </Grid>
    </>
  );
};
