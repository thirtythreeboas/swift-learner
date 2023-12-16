import {FC} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Format} from './Format';
import {CurrentWordBlock} from './CurrentWordBlock';
import {BlockSize} from './BlockSize';
import {WordNumber} from './WordNumber';
import {WordOrder} from './WordOrder';
import {TestTimer} from './TestTimer';
import {ControllerButtons} from './ControllerButtons';
import {gridBreakpoints} from './breakpoints';
import {testSettingsStyles as s} from './style';

export const TestSettings: FC = () => {
  return (
    <Box css={s.container}>
      <Typography variant='h5' gutterBottom>
        Параметры
      </Typography>
      <Grid container css={s.contentWrapper} columns={5}>
        <Format breakpoints={gridBreakpoints} />
        <CurrentWordBlock breakpoints={gridBreakpoints} />
        <BlockSize breakpoints={gridBreakpoints} />
        <WordNumber breakpoints={gridBreakpoints} />
        <WordOrder breakpoints={gridBreakpoints} />
        <TestTimer breakpoints={gridBreakpoints} />
      </Grid>
      <ControllerButtons />
    </Box>
  );
};
