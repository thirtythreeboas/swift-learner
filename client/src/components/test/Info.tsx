import { useState, useEffect, useRef } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  testLauncher,
  stopTest,
  getWordCount,
  wordOrderSetter,
  setFormat,
  setTime
} from '../../store/test';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

interface TimerManager {
  showTime: boolean;
  time: number;
}

const Info = () => {

  useEffect(() => {
    return () => {
      dispatch(stopTest())
    }
  }, [])
  
  library.add(fas)

  const arrowLookup: IconLookup = {
    prefix: 'fas', 
    iconName: 'repeat'
  };

  const arrowIconDefinition: IconDefinition = findIconDefinition(arrowLookup);

  const word = useAppSelector(selectWords);
  const test = useAppSelector(selectTest);
  const dispatch = useAppDispatch();

  const setTimer = useRef<NodeJS.Timer>();
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
    const switchBlock = document.getElementById('lang') as HTMLElement;
    const children = switchBlock.getElementsByTagName('span');
    children[0].innerHTML = test.testFormat ? 'Русский' : 'English';
    children[1].innerHTML = test.testFormat ? 'English' : 'Русский';
    dispatch(setFormat());
  };
  
  // returns amount of words of a chosen block of words
  // looks bad looks baad
  const amount = () => {
    let num = 0;
    let arr = word.chosenBlocks;
    arr.map((e: string) => {
      num += word.data[e].length;
    })
    return num;
  };

  const getTime = (seconds: TimerManager) => {
    if (seconds.showTime) clearInterval(setTimer.current);
    let mins: number = Math.floor(seconds.time / 60);
    let secs: number = seconds.time % 60;
    const time = (mins <= 9 ? `0${mins}` : mins) + ':' + (secs <= 9 ? `0${secs}` : secs);
    return time;
  };

  const restricWordAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (num >= arrLength || num === 0 || isNaN(num)) dispatch(getWordCount(arrLength));
    if (num <= arrLength) dispatch(getWordCount(num));
  }

  const startTest = () => {
    dispatch(testLauncher());
    testDuration();
    // looks bad looks baad
    if (test.wordAmount === 0) {
      let num = document.getElementById('word-count-input') as HTMLInputElement;
      let convertedValue: number = parseInt(num.value, 10);
      let value: number = !isNaN(convertedValue) ? convertedValue : arrLength;
      dispatch(getWordCount(value));
    }
  };

  const finishTest = () => {
    clearInterval(setTimer.current);
    dispatch(stopTest());
  };

  return (
    <div className="info-container">
      <h3>Параметры:</h3>
      <div className="details">
        <dl className="info-row" id="info-row-switch-lang">
          <dt className="left-info">
            Формат:
          </dt>
          <dd className="right-info"  id="lang">
            <span>English</span>
            <button className='switchLangButton' onClick={() => returnMode()} disabled={test.startTest}>
              <FontAwesomeIcon icon={arrowIconDefinition}/>
            </button>
            <span>Русский</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Блок: </span>
          </dt>
          <dd className="right-info">
            <span>{word.chosenBlocks}</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Размер блока: </span>
          </dt>
          <dd className="right-info">
            <span>{amount()}</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Количество слов: </span>
          </dt>
          <dd className="right-info">
            <span>
              <input 
                type="number"
                min="0"
                max={word.data[`${[word.chosenBlocks[0]]}`].length}
                id="word-count-input" 
                onChange={e => restricWordAmount(e)} 
                readOnly={test.startTest}
              />
            </span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Порядок слов: </span>
          </dt>
          <dd className="right-info">
            <span>
              <fieldset className='test-mode-settings'>
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
        <dl className="info-row">
          <dt className="left-info"><span>Таймер: </span></dt>
          <dd className="right-info"><span>{getTime(test.timer)}</span></dd>
        </dl>
      </div>
      <div className='test-management-buttons'>
        {
          !test.startTest ? 
          <button 
            className='start-test' 
            onClick={() => startTest()}
          >
          Начать</button>
          :
          <>
            <button className='start-test start-test-description'>Введите перевод слова</button>
            <button className='start-test stop-test' onClick={() => finishTest()}>Начать заново</button>
          </>
        }
      </div>
    </div>
  )
};

export default Info;