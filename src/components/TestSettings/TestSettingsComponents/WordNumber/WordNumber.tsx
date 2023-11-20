import {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {setWordNumber} from '@/features/test/testSlice';
import {Breakpoints} from '@/types/breakpoints';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {hasNumericChars} from '@/utils/hasNumericChars';
import styles from '../../TestSettings.module.scss';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordNumber: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const test = useAppSelector((state) => state.test);
  const [numericValue, setNumericValue] = useState<string | number>(
    test.wordNumber,
  );

  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const testSelector = useAppSelector((state) => state.test);
  const wordsSelector = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  const blockLength: number = wordsSelector.wordBlock.length;

  const restricWordNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const wordsNumber = e.target.value;
    const num: number | boolean = hasNumericChars(wordsNumber, blockLength);
    if (typeof num === 'number') {
      setNumericValue(num);
      dispatch(setWordNumber(num));
    } else {
      setNumericValue('');
    }
  };

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Количество слов:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        <TextField
          sx={{width: '50px'}}
          hiddenLabel
          id={styles['word-count-input']}
          variant='standard'
          size='small'
          value={numericValue}
          InputProps={{
            readOnly: testSelector.isTestStarted,
          }}
          onChange={(e) => restricWordNumber(e)}
        />
      </Grid>
    </>
  );
};
