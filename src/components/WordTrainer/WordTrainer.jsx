import React, { useEffect, useState, useRef } from 'react';
import styles from './WordTrainer.module.scss';
import {useSelector, useDispatch} from 'react-redux'
import {setIndex, getTestResults, manageTestRestart} from '../../store/test'

export const WordTrainer = () => {

  const words = useSelector(state => state.words)
  const test = useSelector(state => state.test)
  const dispatch = useDispatch()
  const vocabulary = words.data[`${words.chosenBlocks[0]}`]
  const focusInputfield = useRef(null)
  
  useEffect(() => {
    setWordOrder();
    if (test.startTest) focusInputfield.current?.focus();
  }, [test.startTest, test.index]);

  const [next, setNext] = useState('');
  const [answer, setAnswer] = useState('');
  const [translation, setTranslation] = useState([]);
  const [results, setResults] = useState({
    time: 0,
    data: []
  });
  const [randomIndices, setRandomIndices] = useState([]);
  const displayBlockLength = () => {
    return test.wordAmount > vocabulary.length 
    || test.wordAmount === 0 
    || isNaN(test.wordAmount)
    || test.wordAmount < 0 ? 
    `${test.index + 1}/${vocabulary.length}`
    :
    `${test.index + 1}/${test.wordAmount}`
  };

  const setWordOrder = () => {
    if (test.wordOrder === 2) {
      let index = Math.floor(Math.random() * vocabulary.length);
      while (randomIndices.includes(index)) {
        index = Math.floor(Math.random() * vocabulary.length);
      }
      let arr = [...randomIndices, index];
      setRandomIndices(arr);
      let word = vocabulary[index][`${test.testFormat ? 'eng' : 'rus'}`][0]
      setNext(next => word);
      setTranslation(translation => vocabulary[index][`${!test.testFormat ? 'eng' : 'rus'}`])
    } else {
      const lang = test.testFormat ? 'eng' : 'rus';
      let word = vocabulary[test.index][`${test.testFormat ? 'eng' : 'rus'}`][0];
      setTranslation(translation => vocabulary[test.index][`${!test.testFormat ? 'eng' : 'rus'}`])
      setNext(word);
    }
  };

  const nextWord = () => {
    let input = {
        time: test.timer.time,
        data: [...results.data, {
          target: next,
          input: answer,
          answer: translation
        }]
    };
    if (test.index + 1 === test.wordAmount) {
      setResults(results => ({
        ...results,
        data: []
      }));
      dispatch(manageTestRestart());
      dispatch(getTestResults(input));
    } else {
      dispatch(setIndex());
      setResults(input);
      const clearInput = document.getElementById('get-word-input');
      clearInput.value = '';
      focusInputfield.current?.focus();
    }
    setAnswer('');
  };

  const pressToNextWord = e => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputBlock}>
          <span id={styles['word-to-translate']}>{next}</span>
          <input 
            type="text"
            id='get-word-input'
            ref={focusInputfield}
            className={styles['word-to-enter']}
            onKeyDown={(e) => pressToNextWord(e)}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <input 
          type="button"
          value={`${test.index + 1 === test.wordAmount ? 'Закончить тест' : 'Далее'}`}
          className={styles.inputWordButton}
          onClick={() => nextWord()}
        />
      </div>

      <div className={styles.amountBadges}>
        <span>
          {displayBlockLength()}
        </span>
      </div>
    </>
  )
}