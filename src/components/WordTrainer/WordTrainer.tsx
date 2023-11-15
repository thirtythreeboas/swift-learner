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

  const [word, setWord] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
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
      setRandomIndices((prevState) => [...prevState, index]);
      const wordToTranslate =
        vocabulary[index][`${test.testFormat ? 'eng' : 'rus'}`][0];
      setWord(wordToTranslate);
      setCorrectAnswer(
        vocabulary[index][`${!test.testFormat ? 'eng' : 'rus'}`],
      );
    } else {
      const wordToTranslate =
        vocabulary[test.currentWordIndex][
          `${test.testFormat ? 'eng' : 'rus'}`
        ][0];
      setCorrectAnswer(
        vocabulary[test.currentWordIndex][
          `${!test.testFormat ? 'eng' : 'rus'}`
        ],
      );
      setWord(wordToTranslate);
    }
  };

  useEffect(() => {
    setWordOrder();
    if (test.isTestStarted) focusInputfield.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.isTestStarted, test.currentWordIndex]);

  const nextWord = () => {
    const input: TestResult = {
      time: convertTimeToString(test.timeSpentOnTest),
      data: [
        ...results.data,
        {
          word,
          userAnswer,
          correctAnswer,
        },
      ],
    };
    if (test.currentWordIndex + 1 === test.wordNumber) {
      setResults({...results, data: []});
      dispatch(completeTest());
      dispatch(setResult(input));
    } else {
      dispatch(setNextWord());
      setResults(input);
      if (focusInputfield.current) {
        focusInputfield.current.value = '';
        focusInputfield.current?.focus();
      }
    }
    setUserAnswer('');
  };

  // handleWordChange
  // const nextWord = () => {
  //   console.log('handleWordChange');

  // };

  const pressToNextWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputBlock}>
          <span id={styles['word-to-translate']}>{word}</span>
          <input
            type='text'
            id='get-word-input'
            ref={focusInputfield}
            className={styles['word-to-enter']}
            onKeyDown={(e) => pressToNextWord(e)}
            onChange={(e) => setUserAnswer(e.target.value)}
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
