import {FC} from 'react';
import {useAppDispatch} from '@/app/hooks';
import {wordOrderSetter} from '@/features/test/testSlice';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export const WordOrder: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid item xs={2} md={2} lg={2}>
        Порядок слов:
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
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
                  onChange={(e) => dispatch(wordOrderSetter(e.target.value))}
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
                  onChange={(e) => dispatch(wordOrderSetter(e.target.value))}
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
