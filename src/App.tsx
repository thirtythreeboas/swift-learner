import {FC, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import {getWords} from '@/features/thunks';
import {Navbar} from '@/components/Navbar';
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
      <div className={styles.appContainer}>
        {Object.keys(words.data).length === 0 ? <LinearProgress /> : <Outlet />}
      </div>
    </div>
  );
};
