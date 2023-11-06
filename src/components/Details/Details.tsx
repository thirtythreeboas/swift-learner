import {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRepeat} from '@fortawesome/free-solid-svg-icons';
import {
  testLauncher,
  stopTest,
  getWordCount,
  wordOrderSetter,
  setFormat,
  setTime,
} from '@/features/test/testSlice';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {Timer} from '@/types/state';
import styles from './TestSettings.module.scss';

export const Details = () => {
  const test = useAppSelector((state) => state.test);
  const word = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(stopTest());
    },
    [dispatch],
  );

  const setTimer = useRef<NodeJS.Timeout | null>(null);
  const arrLength = word.data[word.chosenBlocks[0]].length;
  const [isLangSwitched, setIsLangSwitched] = useState<boolean>(true);

  // sets timer for a test
  const testDuration = () => {
    setTimer.current = setInterval(() => {
      dispatch(setTime());
    }, 1000);
  };

  // sets translation mode
  const toggleLanguage = () => {
    setIsLangSwitched(!isLangSwitched);
    dispatch(setFormat());
  };

  // returns amount of words of a chosen block of words
  // looks bad looks baad
  const amount = () => {
    const arr = word.chosenBlocks;
    const num = arr.reduce((acc, e) => acc + word.data[e].length, 0);
    return num;
  };

  const getTime = (seconds: Timer) => {
    if (seconds.showTime && setTimer.current) clearInterval(setTimer.current);
    const mins = Math.floor(seconds.time / 60);
    const secs = seconds.time % 60;
    const time = `${mins <= 9 ? `0${mins}` : mins}:${
      secs <= 9 ? `0${secs}` : secs
    }`;
    return time;
  };

  const restricWordAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (num >= arrLength || num === 0 || Number.isNaN(num))
      dispatch(getWordCount(arrLength));
    if (num <= arrLength) dispatch(getWordCount(num));
  };

  const startTest = () => {
    dispatch(testLauncher());
    testDuration();
  };

  const finishTest = () => {
    if (setTimer.current) {
      clearInterval(setTimer.current);
      dispatch(stopTest());
    }
  };

  return (
    <div className={styles.infoContainer}>
      <h3>Параметры:</h3>
      <div className={styles.details}>
        <dl className={styles.infoRow} id={styles['info-row-switch-lang']}>
          <dt className={styles.leftInfo}>Формат:</dt>
          <dd className={styles.rightInfo} id={styles.lang}>
            <span>{`${isLangSwitched ? 'English' : 'Русский'}`}</span>
            <button
              type='button'
              className={styles.switchLangButton}
              onClick={() => toggleLanguage()}
              disabled={test.startTest}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>
            <span>{`${isLangSwitched ? 'Русский' : 'English'}`}</span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}>
            <span>Блок: </span>
          </dt>
          <dd className={styles.rightInfo}>
            <span>{word.chosenBlocks}</span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}>
            <span>Размер блока: </span>
          </dt>
          <dd className={styles.rightInfo}>
            <span>{amount()}</span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}>
            <span>Количество слов: </span>
          </dt>
          <dd className={styles.rightInfo}>
            <span>
              <input
                type='number'
                min='0'
                max={word.data[word.chosenBlocks[0]].length}
                id={styles['word-count-input']}
                onChange={(e) => restricWordAmount(e)}
                readOnly={test.startTest}
              />
            </span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}>
            <span>Порядок слов: </span>
          </dt>
          <dd className={styles.rightInfo}>
            <span>
              <fieldset className={styles.testModeSettings}>
                <div>
                  <label htmlFor='sequential'>
                    <input
                      type='radio'
                      id='sequential'
                      name='wordOrder'
                      value='1'
                      onChange={(e) =>
                        dispatch(wordOrderSetter(e.target.value))
                      }
                      checked={test.wordOrder === 1}
                      disabled={test.startTest}
                    />
                    Последовательно
                  </label>
                </div>
                <div>
                  <label htmlFor='random'>
                    <input
                      type='radio'
                      id='random'
                      name='wordOrder'
                      value='2'
                      onChange={(e) =>
                        dispatch(wordOrderSetter(e.target.value))
                      }
                      checked={test.wordOrder === 2}
                      disabled={test.startTest}
                    />
                    В случайном порядке
                  </label>
                </div>
              </fieldset>
            </span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}>
            <span>Таймер: </span>
          </dt>
          <dd className={styles.rightInfo}>
            <span>{getTime(test.timer)}</span>
          </dd>
        </dl>
      </div>
      <div className={styles.testManagementButtons}>
        {!test.startTest ? (
          <button
            type='button'
            className={styles.startTest}
            onClick={() => startTest()}
          >
            Начать
          </button>
        ) : (
          <>
            <p className={`${styles.startTest} ${styles.startTestDescription}`}>
              Введите перевод слова
            </p>
            <button
              type='button'
              className={`${styles.startTest} ${styles.stopTest}`}
              onClick={() => finishTest()}
            >
              Начать заново
            </button>
          </>
        )}
      </div>
    </div>
  );
};
