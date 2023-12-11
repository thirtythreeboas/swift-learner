import {FC, useEffect, Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppDispatch} from '@/hooks/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import {getVocabCategories} from '@/store/vocabulary-data/action-creators';
import {Navbar} from '@/components/Navbar';
import Container from '@mui/material/Container';
import {appStyles as s} from './styles/GlobalStyles';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVocabCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container css={s.appContainer}>
      <Navbar />
      <Container css={s.contentSection}>
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </Container>
    </Container>
  );
};
