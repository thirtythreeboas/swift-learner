import {FC, useRef} from 'react';
import {useAppSelector} from '@/app/hooks';
import {Timer} from '@/types/state';
import Grid from '@mui/material/Grid';

export const TestTimer: FC = () => {
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
      <Grid item xs={2} md={2} lg={2}>
        Таймер:
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        {getTime(testSelector.timer)}
      </Grid>
    </>
  );
};
