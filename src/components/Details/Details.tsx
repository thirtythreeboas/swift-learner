import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import styles from './TestSettings.module.scss';
import {
  testLauncher,
  stopTest,
  getWordCount,
  wordOrderSetter,
  setFormat,
  setTime,
} from '@/store/test';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Timer } from '@/types/state';

export default function Details() {
  const test = useAppSelector((state) => state.test);
  const word = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(stopTest());
  }, [dispatch]);

  const setTimer = useRef<NodeJS.Timeout | null>(null);
  const arrLength = word.data[word.chosenBlocks[0]].length;

  // sets timer for a test
  const testDuration = () => {
    setTimer.current = setInterval(() => {
      dispatch(setTime());
    }, 1000);
  };

  // sets translation mode
  // looks bad looks baad
  const returnMode = () => {
    const switchBlock = document.getElementById(styles.lang)! as HTMLElement;
    const children = switchBlock.getElementsByTagName('span');
    children[0].innerHTML = test.testFormat ? 'Русский' : 'English';
    children[1].innerHTML = test.testFormat ? 'English' : 'Русский';
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
    const time = `${mins <= 9 ? `0${mins}` : mins}:${secs <= 9 ? `0${secs}` : secs}`;
    return time;
  };

  const restricWordAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (num >= arrLength || num === 0 || Number.isNaN(num)) dispatch(getWordCount(arrLength));
    if (num <= arrLength) dispatch(getWordCount(num));
  };

  const startTest = () => {
    dispatch(testLauncher());
    testDuration();
    // looks bad looks baad
    if (test.wordAmount === 0) {
      const num = document.getElementById('word-count-input') as HTMLInputElement;
      const convertedValue = parseInt(num.value, 10);
      const value = !Number.isNaN(convertedValue) ? convertedValue : arrLength;
      dispatch(getWordCount(value));
    }
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
          <dt className={styles.leftInfo}>
            Формат:
          </dt>
          <dd className={styles.rightInfo} id={styles.lang}>
            <span>English</span>
            <button
              type='button'
              className={styles.switchLangButton}
              onClick={() => returnMode()}
              disabled={test.startTest}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>
            <span>Русский</span>
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
                max={word.data[`${[word.chosenBlocks[0]]}`].length}
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
                  <input
                    type='radio'
                    id='sequential'
                    name='wordOrder'
                    value='1'
                    onChange={(e) => dispatch(wordOrderSetter(e.target.value))}
                    checked={test.wordOrder === 1}
                    disabled={test.startTest}
                  />
                  <label htmlFor='sequential'>Последовательно</label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='random'
                    name='wordOrder'
                    value='2'
                    onChange={(e) => dispatch(wordOrderSetter(e.target.value))}
                    checked={test.wordOrder === 2}
                    disabled={test.startTest}
                  />
                  <label htmlFor='random'>В случайном порядке</label>
                </div>
              </fieldset>
            </span>
          </dd>
        </dl>
        <dl className={styles.infoRow}>
          <dt className={styles.leftInfo}><span>Таймер: </span></dt>
          <dd className={styles.rightInfo}><span>{getTime(test.timer)}</span></dd>
        </dl>
      </div>
      <div className={styles.testManagementButtons}>
        {
            !test.startTest
              ? (
                <button
                  type='button'
                  className={styles.startTest}
                  onClick={() => startTest()}
                >
                  Начать
                </button>
              )
              : (
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
              )
          }
      </div>
    </div>
  );
}
