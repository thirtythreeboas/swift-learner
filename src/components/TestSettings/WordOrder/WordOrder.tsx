import {FC} from 'react';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import {setWordOrder} from '@/store/test-process/test-process';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {Breakpoints} from '@/types/testSettingsBreakpoints';
import {wordOrderStyle as s} from './style';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordOrder: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const {isTestStarted} = useAppSelector(({TEST}) => TEST);
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Порядок слов:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        <FormControl>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='sequential'
            name='radio-buttons-group'
          >
            <FormControlLabel
              css={s.formCtrlLabel}
              value='sequential'
              control={
                <Radio
                  onChange={(e) => dispatch(setWordOrder(e.target.value))}
                />
              }
              label='Последовательно'
              disabled={isTestStarted}
            />
            <FormControlLabel
              css={s.formCtrlLabel}
              value='random'
              control={
                <Radio
                  onChange={(e) => dispatch(setWordOrder(e.target.value))}
                />
              }
              label='В случайном порядке'
              disabled={isTestStarted}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
};
