import {useAppSelector} from '@/app/hooks';
import {Results} from '@/components/Result';
import {WelcomeImg} from '@/components/WelcomeImg';
import {VocabularyTrainer} from '@/components/VocabularyTrainer';
import styles from './TestLogic.module.scss';

export const TestLogic = () => {
  const test = useAppSelector((state) => state.test);

  return test.isTestStarted ? (
    <div className={styles.testContainer}>
      {test.showResult ? <Results /> : <VocabularyTrainer />}
    </div>
  ) : (
    <WelcomeImg />
  );
};
