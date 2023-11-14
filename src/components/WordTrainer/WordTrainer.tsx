import {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {setNextWord, setResult, completeTest} from '@/features/test/testSlice';
import {convertTimeToString} from '@/utils/convertTimeToString';
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
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [results, setResults] = useState<TestResult>({
    time: '0',
    data: [],
  });

  const displayTestProgress = (): string => {
    return test.wordNumber <= 0
      ? `${test.currentWordIndex + 1}/${vocabulary.length}`
      : `${test.currentWordIndex + 1}/${test.wordNumber}`;
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
      const word =
        vocabulary[test.currentWordIndex][
          `${test.testFormat ? 'eng' : 'rus'}`
        ][0];
      setTranslation(
        vocabulary[test.currentWordIndex][
          `${!test.testFormat ? 'eng' : 'rus'}`
        ],
      );
      setNext(word);
    }
  };

  useEffect(() => {
    setWordOrder();
    if (test.isTestStarted) focusInputfield.current?.focus();
  }, [test.isTestStarted, test.currentWordIndex]);

  const nextWord = () => {
    const input: TestResult = {
      time: convertTimeToString(test.timeSpentOnTest),
      data: [
        ...results.data,
        {
          target: next,
          input: answer,
          answer: translation,
        },
      ],
    };
    if (test.currentWordIndex + 1 === test.wordNumber) {
      setResults({
        ...results,
        data: [],
      });
      dispatch(completeTest());
      dispatch(setResult(input));
    } else {
      dispatch(setNextWord());
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
            test.currentWordIndex + 1 === test.wordNumber
              ? 'Закончить тест'
              : 'Далее'
          }`}
          className={styles.inputWordButton}
          onClick={() => nextWord()}
        />
      </div>

      <div className={styles.amountBadges}>
        <span>{displayTestProgress()}</span>
      </div>
    </>
  );
};
