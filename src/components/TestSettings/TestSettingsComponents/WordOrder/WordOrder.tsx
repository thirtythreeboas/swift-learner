import {FC} from 'react';
import {useAppDispatch} from '@/app/hooks';
import {setWordOrder} from '@/features/test/testSlice';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {Breakpoints} from '@/types/breakpoints';

type RowBreakpointsProps = {
  breakpoints: Breakpoints;
};

export const WordOrder: FC<RowBreakpointsProps> = ({breakpoints}) => {
  const {firstColumn, secondColumn} = breakpoints;
  const {xs: xs1, md: md1, lg: lg1} = firstColumn;
  const {xs: xs2, md: md2, lg: lg2} = secondColumn;

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
            defaultValue='1'
            name='radio-buttons-group'
          >
            <FormControlLabel
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: 'Scada, sans-serif',
                },
                '& .MuiButtonBase-root': {
                  padding: '0 9px',
                },
              }}
              value='1'
              control={
                <Radio
                  onChange={(e) => dispatch(setWordOrder(e.target.value))}
                />
              }
              label='Последовательно'
            />
            <FormControlLabel
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: 'Scada, sans-serif',
                },
                '& .MuiButtonBase-root': {
                  padding: '0 9px',
                },
              }}
              value='2'
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
    </>
  );
};
