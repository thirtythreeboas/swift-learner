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

export const TestSettings: FC = () => {
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
        <Format />
        <CurrentWordBlock />
        <BlockSize />
        <WordNumber />
        <WordOrder />
        <TestTimer />
      </Grid>
    </Box>
  );
};
