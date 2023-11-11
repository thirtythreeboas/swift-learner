import {FC, useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {setFormat} from '@/features/test/testSlice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {Languages} from '@/types/const';

export const Format: FC = () => {
  const testSelector = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();

  const [isLangSwapped, setIsLangSwapped] = useState<boolean>(true);
  const [isRotateOnSwap, setIsRotateOnSwap] = useState<boolean>(false);

  const rotate = isRotateOnSwap ? 'rotate(360deg)' : 'rotate(0)';
  const swapLangs = () => {
    setIsRotateOnSwap(!isRotateOnSwap);
    setTimeout(() => setIsRotateOnSwap(!isRotateOnSwap), 1000);
    setIsLangSwapped(!isLangSwapped);
    dispatch(setFormat());
  };

  return (
    <>
      <Grid item xs={2} md={2} lg={2}>
        Формат
      </Grid>
      <Grid
        item
        xs={3}
        md={3}
        lg={3}
        display='flex'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Typography
          sx={{
            minWidth: '60px',
            textAlign: 'left',
            fontFamily: '"Scada", sans-serif',
          }}
        >
          {isLangSwapped ? Languages.ENGLISH : Languages.RUSSIAN}
        </Typography>
        <Button
          sx={{
            height: '20px',
            '& .MuiSvgIcon-fontSizeMedium': {
              transform: rotate,
              transition: '1s',
            },
          }}
          onClick={() => swapLangs()}
          disabled={testSelector.startTest}
        >
          <ArrowRightAltIcon />
        </Button>
        <Typography
          sx={{
            minWidth: '60px',
            textAlign: 'left',
            fontFamily: '"Scada", sans-serif',
          }}
        >
          {isLangSwapped ? Languages.RUSSIAN : Languages.ENGLISH}
        </Typography>
      </Grid>
    </>
  );
};
