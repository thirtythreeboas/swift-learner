import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Details} from '@/components/Details';
import {TestLogic} from '@/components/TestLogic';
import {Loading} from '@/components/UI/Loading';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import styles from './Test.module.scss';

export const Test = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (words.chosenBlocks.length === 0) {
      navigate('/');
    }
  }, [navigate, dispatch, words]);

  if (words.chosenBlocks.length === 0) return <Loading />;

  return (
    <div className={styles.test}>
      <Details />
      <TestLogic />
    </div>
  );
};
