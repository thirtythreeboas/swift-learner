import { useState, useEffect, useRef } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setIndex, getTestResults, manageTestRestart } from '../../store/test';
import Results from './Results';

interface Data {
  input: string;
  target: string;
  answer: string[];
}

interface TestResults {
  time: number;
  data: Data[]
}

const Test = () => {
  
  const words = useAppSelector(selectWords);
  const test = useAppSelector(selectTest);
  const dispatch = useAppDispatch();
  const vocabulary = words.data[`${words.chosenBlocks[0]}`];
  const focusInputfield = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setWordOrder();
    if (test.startTest) focusInputfield.current?.focus();
  }, [test.startTest, test.index]);

  const [next, setNext] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [translation, setTranslation] = useState<string[]>([]);
  const [results, setResults] = useState<TestResults>({
    time: 0,
    data: []
  });
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
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
    let input: TestResults = {
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
      const clearInput = document.getElementById('get-word-input') as HTMLInputElement;
      clearInput.value = '';
      focusInputfield.current?.focus();
    }
    setAnswer('');
  };

  const pressToNextWord = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    !test.startTest ?
    <img 
      style={{width: `max(400px, 50%)`}}
      src="https://sun9-50.userapi.com/impg/YgpXpztaf-cu_ZzTQcu4ea4aQBFEacRTnOzRdA/h5m1xJ1ycAk.jpg?size=654x435&quality=96&sign=90681a59c19259c5f2abc3658d21d1d3&type=album"
      alt="img"
    />
    :
    <div className="test-container">
      {
        test.closeTestWindow ?
        <>
          <div className='input-container'>
            <div className='input-block'>
              <span id='word-to-translate'>{next}</span>
              <input 
                type="text"
                id='get-word-input'
                ref={focusInputfield}
                className='word-to-enter'
                onKeyPress={(e) => pressToNextWord(e)}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <input 
              type="button"
              value={`${test.index + 1 === test.wordAmount ? 'Закончить тест' : 'Далее'}`}
              className='input-word-button'
              onClick={() => nextWord()}
            />
          </div>

          <div className='amount-badges'>
            <span>
              {displayBlockLength()}
            </span>
          </div>
          </>
        :
        <Results />
      }
    </div>
  )
};

export default Test;
