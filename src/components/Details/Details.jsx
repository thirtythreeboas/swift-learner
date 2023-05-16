import React, {useEffect, useRef} from 'react'
import styles from './TestSettings.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  testLauncher,
  stopTest,
  getWordCount,
  wordOrderSetter,
  setFormat,
  setTime
} from '../../store/test'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'

export const Details = () => {

  const test = useSelector(state => state.test)
  const word = useSelector(state => state.words)

  useEffect(() => {
    return () => {
      dispatch(stopTest())
    }
  }, [])

  const dispatch = useDispatch();

  const setTimer = useRef();
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
      const switchBlock = document.getElementById(styles.lang)
      const children = switchBlock.getElementsByTagName('span')
      children[0].innerHTML = test.testFormat ? 'Русский' : 'English'
      children[1].innerHTML = test.testFormat ? 'English' : 'Русский'
      dispatch(setFormat());
    };
    
    // returns amount of words of a chosen block of words
    // looks bad looks baad
    const amount = () => {
      let num = 0;
      let arr = word.chosenBlocks;
      arr.map(e => {
        num += word.data[e].length;
      })
      return num;
    };
  
    const getTime = seconds => {
      if (seconds.showTime) clearInterval(setTimer.current);
      let mins = Math.floor(seconds.time / 60);
      let secs = seconds.time % 60;
      const time = (mins <= 9 ? `0${mins}` : mins) + ':' + (secs <= 9 ? `0${secs}` : secs);
      return time;
    };
  
    const restricWordAmount = e => {
      const num = parseInt(e.target.value, 10);
      if (num >= arrLength || num === 0 || isNaN(num)) dispatch(getWordCount(arrLength));
      if (num <= arrLength) dispatch(getWordCount(num));
    }
  
    const startTest = () => {
      dispatch(testLauncher());
      testDuration();
      // looks bad looks baad
      if (test.wordAmount === 0) {
        let num = document.getElementById('word-count-input')
        let convertedValue = parseInt(num.value, 10);
        let value = !isNaN(convertedValue) ? convertedValue : arrLength;
        dispatch(getWordCount(value));
      }
    };
  
    const finishTest = () => {
      clearInterval(setTimer.current);
      dispatch(stopTest());
    };
  
    return (
      <div className={styles.infoContainer}>
        <h3>Параметры:</h3>
        <div className={styles.details}>
          <dl className={styles.infoRow} id={styles['info-row-switch-lang']}>
            <dt className={styles.leftInfo}>
              Формат:
            </dt>
            <dd className={styles.rightInfo}  id={styles.lang}>
              <span>English</span>
              <button className={styles.switchLangButton} onClick={() => returnMode()} disabled={test.startTest}>
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
                  type="number"
                  min="0"
                  max={word.data[`${[word.chosenBlocks[0]]}`].length}
                  id={styles['word-count-input']} 
                  onChange={e => restricWordAmount(e)} 
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
                      type="radio" 
                      id="sequential" 
                      name="wordOrder" 
                      value="1" 
                      onChange={e => dispatch(wordOrderSetter(e.target.value))} 
                      checked={test.wordOrder === 1}
                      disabled={test.startTest}
                    />
                    <label htmlFor="sequential">Последовательно</label>
                  </div>
                  <div>
                    <input 
                      type="radio" 
                      id="random" 
                      name="wordOrder" 
                      value="2" 
                      onChange={e => dispatch(wordOrderSetter(e.target.value))} 
                      checked={test.wordOrder === 2}
                      disabled={test.startTest}
                    />
                    <label htmlFor="random">В случайном порядке</label>
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
            !test.startTest ? 
            <button 
              className={styles.startTest}
              onClick={() => startTest()}
            >
            Начать</button>
            :
            <>
              <button className={`${styles.startTest} ${styles.startTestDescription}`} >Введите перевод слова</button>
              <button className={`${styles.startTest} ${styles.stopTest}`} onClick={() => finishTest()}>Начать заново</button>
            </>
          }
        </div>
      </div>
    )
}