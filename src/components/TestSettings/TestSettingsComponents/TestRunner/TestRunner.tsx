import {FC, useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {
  startTest,
  setTime,
  restartTest,
  completeTest,
} from '@/features/test/testSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const TestRunner: FC = () => {
  const [spentTime, setSpentTime] = useState<number>(0);
  const testTimer = useRef<NodeJS.Timeout | null>(null);
  const {isTestStarted, showResult} = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  const btnStyles = {
    backgroundColor: '#1976d2',
    border: '2px solid #1976d2',
    margin: '10px 0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
      border: '2px solid #1976d2',
    },
  };

  const disabledBtnStyles = (isColorsSwapped: boolean) => {
    return {
      backgroundColor: isColorsSwapped ? '#1976d2' : '#00000042',
      borderColor: isColorsSwapped ? '#1976d2' : '#00000042',
    };
  };

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
    <Box sx={{justifyContent: 'space-between', display: 'flex'}}>
      <Button
        sx={{
          ...btnStyles,
          ...disabledBtnStyles(!isTestStarted),
        }}
        onClick={() => dispatch(startTest())}
        disabled={isTestStarted}
      >
        Начать
      </Button>
      <Button
        sx={{
          ...btnStyles,
          ...disabledBtnStyles(isTestStarted),
        }}
        disabled={!isTestStarted}
        onClick={() => finishTest()}
      >
        Начать заново
      </Button>
      <Button
        sx={{
          ...btnStyles,
          ...disabledBtnStyles(isTestStarted && !showResult),
        }}
        disabled={!isTestStarted || showResult}
        onClick={() => dispatch(completeTest())}
      >
        Закончить и посмотреть результат
      </Button>
    </Box>
  );
};
