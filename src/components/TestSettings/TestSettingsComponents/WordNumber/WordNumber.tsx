import {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/hooks/hooks';
import {setWordNumber} from '@/store/test-process/test-process';
import {Breakpoints} from '@/types/testSettingsBreakpoints';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {hasNumericChars} from '@/utils/hasNumericChars';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordNumber: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const test = useAppSelector(({TEST}) => TEST);
  const [numericValue, setNumericValue] = useState<string | number>(
    test.wordNumber,
  );

  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const testSelector = useAppSelector(({TEST}) => TEST);
  const wordsSelector = useAppSelector(({WORDS}) => WORDS);
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
