import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from './styles/General.module.scss';
import { Home } from '@/pages/Home/Home';
import { Test } from '@/pages/Test/Test';
import { ShowWords } from '@/components/ShowWords';
import { Loading } from '@/components/UI/Loading/Loading';
import { getWords } from '@/store/word';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

function App() {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWords());
  }, [dispatch]);

  if (Object.keys(words.data).length === 0) return <Loading />;

  return (
    <div className={styles.app}>
      <Link to='/' className={styles.header}>
        SWIFT-LEARNER
      </Link>
      <div className={styles.appContainer}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/words' element={<ShowWords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
