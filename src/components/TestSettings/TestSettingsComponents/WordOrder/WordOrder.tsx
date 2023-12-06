/** @jsxRuntime classic */
/** @jsx jsx */
import React, {FC} from 'react';
import {useAppDispatch} from '@/hooks/hooks';
import {setWordOrder} from '@/store/test-process/test-process';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {jsx} from '@emotion/react';
import {Breakpoints} from '@/types/testSettingsBreakpoints';
import {wordOrderStyle as s} from './style';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordOrder: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Grid item xs={xs1} md={md1} lg={lg1}>
        Порядок слов:
      </Grid>
      <Grid item xs={xs2} md={md2} lg={lg2}>
        <FormControl>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='0'
            name='radio-buttons-group'
          >
            <FormControlLabel
              css={s.formCtrlLabel}
              value='0'
              control={
                <Radio
                  onChange={(e) => dispatch(setWordOrder(e.target.value))}
                />
              }
              label='Последовательно'
            />
            <FormControlLabel
              css={s.formCtrlLabel}
              value='1'
              control={
                <Radio
                  onChange={(e) => dispatch(setWordOrder(e.target.value))}
                />
              }
              label='В случайном порядке'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};
