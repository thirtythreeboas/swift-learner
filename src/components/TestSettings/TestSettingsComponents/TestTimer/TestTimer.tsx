import {FC, useRef} from 'react';
import {useAppSelector} from '@/app/hooks';
import {Timer} from '@/types/state';
import Grid from '@mui/material/Grid';
import {Breakpoints} from '@/types/breakpoints';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const TestTimer: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const testSelector = useAppSelector((state) => state.test);

  const setTimer = useRef<NodeJS.Timeout | null>(null);
  const getTime = (seconds: Timer) => {
    if (seconds.showTime && setTimer.current) clearInterval(setTimer.current);
    const mins = Math.floor(seconds.time / 60);
    const secs = seconds.time % 60;
    const time = `${mins <= 9 ? `0${mins}` : mins}:${
      secs <= 9 ? `0${secs}` : secs
    }`;
    return time;
  };

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Таймер:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        {getTime(testSelector.timer)}
      </Grid>
    </>
  );
};
