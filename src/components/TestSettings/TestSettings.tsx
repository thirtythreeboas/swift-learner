import {FC} from 'react';
import {
  Format,
  CurrentWordBlock,
  BlockSize,
  WordNumber,
  WordOrder,
  TestTimer,
} from '@/components/TestSettings/TestSettingsComponents';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Breakpoints} from '@/types/breakpoints';

export const TestSettings: FC = () => {
  const breakpoints: Breakpoints = {
    firstColumn: {
      xs: 2,
      md: 2,
      lg: 2,
    },
    secondColumn: {
      xs: 3,
      md: 3,
      lg: 3,
    },
  };

  return (
    <Box sx={{'& .MuiGrid-root': {margin: '0'}}}>
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
        <Format breakpoints={breakpoints} />
        <CurrentWordBlock breakpoints={breakpoints} />
        <BlockSize breakpoints={breakpoints} />
        <WordNumber breakpoints={breakpoints} />
        <WordOrder breakpoints={breakpoints} />
        <TestTimer breakpoints={breakpoints} />
      </Grid>
    </Box>
  );
};
