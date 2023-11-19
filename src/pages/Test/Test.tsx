import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {TestLogic} from '@/components/TestLogic';
import {Loading} from '@/components/UI/Loading';
import {useAppSelector} from '@/app/hooks';
import {TestSettings} from '@/components/TestSettings/TestSettings';
// import styles from './Test.module.scss';

export const Test = () => {
  const words = useAppSelector((state) => state.words);
  const navigate = useNavigate();

  useEffect(() => {
    if (words.chosenBlocks) {
      navigate('/');
    }
  }, []);

  if (words.chosenBlocks) return <Loading />;

  return (
    <>
      <TestSettings />
      <TestLogic />
    </>
  );
};
