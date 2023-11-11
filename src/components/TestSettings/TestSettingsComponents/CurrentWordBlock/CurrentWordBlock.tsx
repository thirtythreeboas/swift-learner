import {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useAppSelector} from '@/app/hooks';

export const CurrentWordBlock: FC = () => {
  const wordSelector = useAppSelector((state) => state.words);

  return (
    <>
      <Grid item xs={2} md={2} lg={2}>
        Блок
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        {wordSelector.chosenBlocks}
      </Grid>
    </>
  );
};
