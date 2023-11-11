import {FC, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import {getWords} from '@/features/thunks';
import {Navbar} from '@/components/Navbar';
import Container from '@mui/material/Container';
import styles from './styles/General.module.scss';

export const App: FC = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWords());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Navbar />
      <Container
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {Object.keys(words.data).length === 0 ? <LinearProgress /> : <Outlet />}
      </Container>
    </div>
  );
};
