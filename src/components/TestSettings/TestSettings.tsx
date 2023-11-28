/** @jsxRuntime classic */
/** @jsx jsx */
import {FC} from 'react';
import {
  Format,
  CurrentWordBlock,
  BlockSize,
  WordNumber,
  WordOrder,
  TestTimer,
  ControllerButtons,
} from '@/components/TestSettings/TestSettingsComponents';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {jsx} from '@emotion/react';
import {gridBreakpoints} from './breakpoints';
import {testSettingsStyles} from './style';

export const TestSettings: FC = () => {
  return (
    <Box css={testSettingsStyles.container}>
      <Typography variant='h5' gutterBottom>
        Параметры
      </Typography>
      <Grid container css={testSettingsStyles.contentWrapper} columns={5}>
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
