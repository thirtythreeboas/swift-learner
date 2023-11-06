import {useAppSelector} from '@/app/hooks';
import {stopwatch, highlightAnswer} from '@/utils/result';
import styles from './Result.module.scss';

export const Results = () => {
  const test = useAppSelector((state) => state.test);
  const {results} = test;

  const numberOfRightAnswers = () => {
    const right = results.data.filter((e) => e.answer.includes(e.input));
    return right;
  };

  return (
    <div className={styles.testResults}>
      <div className={styles.testStatistics}>
        <span>Время: {stopwatch(results.time)}</span>
        <span>
          Правильные ответы:{' '}
          {`${numberOfRightAnswers().length}/${results.data.length}`}
        </span>
      </div>
      <div className={styles.resultData}>
        <div className={styles.headerResult}>
          <div className={styles.cell}>
            <span>Слово</span>
          </div>
          <div className={styles.cell}>
            <span>Перевод</span>
          </div>
          <div className={styles.cell}>
            <span>Правильный ответ</span>
          </div>
        </div>
        {results.data.map((e) => (
          <div className={styles.resultsRow} key={e.target}>
            <div className={styles.cell} style={highlightAnswer(e)}>
              <span>{e.target}</span>
            </div>
            <div className={styles.cell} style={highlightAnswer(e)}>
              <span>{e.input}</span>
            </div>
            <div className={styles.cell} style={{background: '#d7d97b'}}>
              <span>{e.answer[0]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
