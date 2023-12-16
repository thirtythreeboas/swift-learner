import {FC, useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks/hooks';
import {
  startTest,
  setTime,
  restartTest,
  completeTest,
} from '@/store/test-process/test-process';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {controllerBtnStyles as s} from './style';

export const ControllerButtons: FC = () => {
  const [spentTime, setSpentTime] = useState<number>(0);
  const testTimer = useRef<NodeJS.Timeout | null>(null);
  const {isTestStarted, showResult} = useAppSelector(({TEST}) => TEST);
  const dispatch = useAppDispatch();

  const finishTest = () => {
    if (testTimer.current) {
      dispatch(restartTest());
      setSpentTime(0);
    }
  };

  useEffect(() => {
    if (isTestStarted) {
      testTimer.current = setInterval(() => {
        setSpentTime((prevState) => prevState + 1);
      }, 1000);
    }

    return () => {
      if (testTimer.current) {
        clearInterval(testTimer.current);
      }
    };
  }, [isTestStarted]);

  useEffect(() => {
    if (isTestStarted) dispatch(setTime(spentTime));
    if (showResult && testTimer.current) clearInterval(testTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spentTime, showResult]);

  return (
    <Box css={s.container}>
      <Button
        css={s.btn}
        onClick={() => dispatch(startTest())}
        disabled={isTestStarted}
      >
        Начать
      </Button>
      <Button
        css={s.btn}
        disabled={!isTestStarted}
        onClick={() => finishTest()}
      >
        Начать заново
      </Button>
      <Button
        css={s.btn}
        disabled={!isTestStarted || showResult}
        onClick={() => dispatch(completeTest())}
      >
        Закончить и посмотреть результат
      </Button>
    </Box>
  );
};
