import {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {
  setIndex,
  getTestResults,
  manageTestRestart,
} from '@/features/test/testSlice';
import {TestResult} from '@/types/state';
import styles from './WordTrainer.module.scss';

export const WordTrainer = () => {
  const words = useAppSelector((state) => state.words);
  const test = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  const vocabulary = words.data[`${words.chosenBlocks[0]}`];
  const focusInputfield = useRef<HTMLInputElement | null>(null);

  const [next, setNext] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [translation, setTranslation] = useState<string[]>([]);
  const [results, setResults] = useState<TestResult>({
    time: 0,
    data: [],
  });

  const [randomIndices, setRandomIndices] = useState<number[]>([]);

  const displayBlockLength = (): boolean | string => {
    return (
      test.wordAmount > vocabulary.length ||
      test.wordAmount === 0 ||
      Number.isNaN(test.wordAmount) ||
      (test.wordAmount < 0
        ? `${test.index + 1}/${vocabulary.length}`
        : `${test.index + 1}/${test.wordAmount}`)
    );
  };

  const setWordOrder = () => {
    if (test.wordOrder === 2) {
      let index = Math.floor(Math.random() * vocabulary.length);
      while (randomIndices.includes(index)) {
        index = Math.floor(Math.random() * vocabulary.length);
      }
      const arr = [...randomIndices, index];
      setRandomIndices(arr);
      const word = vocabulary[index][`${test.testFormat ? 'eng' : 'rus'}`][0];
      setNext(word);
      setTranslation(vocabulary[index][`${!test.testFormat ? 'eng' : 'rus'}`]);
    } else {
      // const lang: string = test.testFormat ? 'eng' : 'rus';
      const word =
        vocabulary[test.index][`${test.testFormat ? 'eng' : 'rus'}`][0];
      setTranslation(
        vocabulary[test.index][`${!test.testFormat ? 'eng' : 'rus'}`],
      );
      setNext(word);
    }
  };

  useEffect(() => {
    setWordOrder();
    if (test.startTest) focusInputfield.current?.focus();
  }, [test.startTest, test.index]);

  const nextWord = () => {
    const input: TestResult = {
      time: test.timer.time,
      data: [
        ...results.data,
        {
          target: next,
          input: answer,
          answer: translation,
        },
      ],
    };
    if (test.index + 1 === test.wordAmount) {
      setResults({
        ...results,
        data: [],
      });
      dispatch(manageTestRestart());
      dispatch(getTestResults(input));
    } else {
      dispatch(setIndex());
      setResults(input);
      const clearInput = document.getElementById(
        'get-word-input',
      ) as HTMLInputElement | null;
      if (clearInput) {
        clearInput.value = '';
        focusInputfield.current?.focus();
      }
    }
    setAnswer('');
  };

  const pressToNextWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputBlock}>
          <span id={styles['word-to-translate']}>{next}</span>
          <input
            type='text'
            id='get-word-input'
            ref={focusInputfield}
            className={styles['word-to-enter']}
            onKeyDown={(e) => pressToNextWord(e)}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <input
          type='button'
          value={`${
            test.index + 1 === test.wordAmount ? 'Закончить тест' : 'Далее'
          }`}
          className={styles.inputWordButton}
          onClick={() => nextWord()}
        />
      </div>

      <div className={styles.amountBadges}>
        <span>{displayBlockLength()}</span>
      </div>
    </>
  );
};
