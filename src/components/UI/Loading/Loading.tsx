import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {loadingtStyle as s} from './style';

export const Loading = () => {
  return (
    <Container css={s.loading}>
      <CircularProgress size={100} />
    </Container>
  );
};
