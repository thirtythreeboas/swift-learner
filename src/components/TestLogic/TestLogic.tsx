import styles from './TestLogic.module.scss';
import { useAppSelector } from '@/app/hooks';
import { Results } from '@/components/Result';
import { WelcomeImg } from '@/components/WelcomeImg';
import { WordTrainer } from '@/components/WordTrainer';

export function TestLogic() {
  const test = useAppSelector((state) => state.test);

  return !test.startTest ? (
    <WelcomeImg />
  ) : (
    <div className={styles.testContainer}>
      {test.closeTestWindow ? <WordTrainer /> : <Results />}
    </div>
  );
}
