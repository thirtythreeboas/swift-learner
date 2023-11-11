import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {setWordNumber} from '@/features/test/testSlice';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Breakpoints} from '@/types/breakpoints';
import styles from '../../TestSettings.module.scss';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordNumber: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const testSelector = useAppSelector((state) => state.test);
  const wordSelector = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  const arrLength = wordSelector.data[wordSelector.chosenBlocks[0]].length;
  const restricWordNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const num = parseInt(e.target.value, 10);
    if (num >= arrLength || num === 0 || Number.isNaN(num))
      dispatch(setWordNumber(arrLength));
    if (num <= arrLength) dispatch(setWordNumber(num));
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
          InputProps={{
            readOnly: testSelector.startTest,
          }}
          defaultValue={testSelector.wordAmount}
          onChange={(e) => restricWordNumber(e)}
        />
      </Grid>
    </>
  );
};
