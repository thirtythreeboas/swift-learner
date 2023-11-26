/** @jsxRuntime classic */
/** @jsx jsx */
import {FC, useEffect, Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppDispatch} from '@/app/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import {getWords} from '@/features/thunks';
import {Navbar} from '@/components/Navbar';
import {jsx} from '@emotion/react';
import Container from '@mui/material/Container';
import {appStyles} from './styles/GlobalStyles';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWords());
  }, []);

  return (
    <Container css={appStyles.appContainer}>
      <Navbar />
      <Container css={appStyles.contentSection}>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </Container>
    </Container>
  );
};
