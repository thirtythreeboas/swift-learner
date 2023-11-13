import {FC} from 'react';
import {
  Format,
  CurrentWordBlock,
  BlockSize,
  WordNumber,
  WordOrder,
  TestTimer,
  TestRunner,
} from '@/components/TestSettings/TestSettingsComponents';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {gridBreakpoints} from './breakpoints';

export const TestSettings: FC = () => {
  return (
    <Box sx={{'& .MuiGrid-root': {margin: '0'}, width: '600px'}}>
      <Typography variant='h5' gutterBottom>
        Параметры
      </Typography>
      <Grid
        sx={{maxWidth: '400px'}}
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        gap='10px 0'
        columns={5}
      >
        <Format breakpoints={gridBreakpoints} />
        <CurrentWordBlock breakpoints={gridBreakpoints} />
        <BlockSize breakpoints={gridBreakpoints} />
        <WordNumber breakpoints={gridBreakpoints} />
        <WordOrder breakpoints={gridBreakpoints} />
        <TestTimer breakpoints={gridBreakpoints} />
      </Grid>
      <TestRunner />
    </Box>
  );
};
