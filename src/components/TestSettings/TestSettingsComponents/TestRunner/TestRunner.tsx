import {FC, useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {startTest, setTime, restartTest} from '@/features/test/testSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const TestRunner: FC = () => {
  const [spentTime, setSpentTime] = useState<number>(0);
  const testTimer = useRef<NodeJS.Timeout | null>(null);
  const test = useAppSelector((state) => state.test);
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

  const finishTest = () => {
    if (testTimer.current) {
      dispatch(restartTest());
      setSpentTime(0);
    }
  };

  useEffect(() => {
    if (test.isTestStarted) {
      testTimer.current = setInterval(() => {
        setSpentTime((prevState) => prevState + 1);
      }, 1000);
    }

    return () => {
      if (testTimer.current) {
        clearInterval(testTimer.current);
      }
    };
  }, [test.isTestStarted]);

  useEffect(() => {
    if (test.isTestStarted) dispatch(setTime(spentTime));
    if (test.showResult && testTimer.current) clearInterval(testTimer.current);
  }, [spentTime, test.showResult]);

  return (
    <Box sx={{justifyContent: 'space-between', display: 'flex'}}>
      <Button
        sx={{
          ...btnStyles,
          backgroundColor: !test.isTestStarted ? '#1976d2' : '#00000042',
          borderColor: !test.isTestStarted ? '#1976d2' : '#00000042',
        }}
        onClick={() => dispatch(startTest())}
        disabled={test.isTestStarted}
      >
        Начать
      </Button>
      <Button
        sx={{
          ...btnStyles,
          backgroundColor: test.isTestStarted ? '#1976d2' : '#00000042',
          borderColor: test.isTestStarted ? '#1976d2' : '#00000042',
        }}
        disabled={!test.isTestStarted}
        onClick={() => finishTest()}
      >
        Начать заново
      </Button>
      <Button sx={btnStyles}>Закончить и посмотреть результат</Button>
    </Box>
  );
};
