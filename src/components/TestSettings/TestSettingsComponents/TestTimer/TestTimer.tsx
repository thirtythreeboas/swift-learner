import {FC} from 'react';
import {useAppSelector} from '@/hooks/hooks';
import {Breakpoints} from '@/types/testSettingsBreakpoints';
import {convertTimeToString} from '@/utils/convertTimeToString';
import Grid from '@mui/material/Grid';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const TestTimer: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const test = useAppSelector(({TEST}) => TEST);

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Таймер:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        {convertTimeToString(test.timeSpentOnTest)}
      </Grid>
    </>
  );
};
