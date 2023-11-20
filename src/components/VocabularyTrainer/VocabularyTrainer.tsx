import {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {setNextWord, setResult, completeTest} from '@/features/test/testSlice';
import {convertTimeToString} from '@/utils/convertTimeToString';
import {TestResult, Word} from '@/types/state';
import styles from './VocabularyTrainer.module.scss';

export const VocabularyTrainer = () => {
  const wordSlice = useAppSelector((state) => state.words);
  const {
    wordNumber,
    currentWordIndex,
    targetLangCode,
    sourceLangCode,
    isTestStarted,
    timeSpentOnTest,
    wordOrder,
  } = useAppSelector((state) => state.test);

  const dispatch = useAppDispatch();
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
    return wordNumber <= 0
      ? `${currentWordIndex + 1}/${wordSlice.wordBlock.length}`
      : `${currentWordIndex + 1}/${wordNumber}`;
  };

  const getRandomWord = (array: Word[]) => {
    let index = Math.floor(Math.random() * array.length);
    while (randomIndices.includes(index)) {
      index = Math.floor(Math.random() * array.length);
    }
    setRandomIndices((prevState) => [...prevState, index]);
    const block = array[index];
    return block;
  };

  const getSourceLang = (array: Word) => {
    const wordBlock = array[sourceLangCode as keyof Word] as string[];
    const wordToTranslate = wordBlock[0];
    return {wordToTranslate};
  };

  const getTargetLang = (array: Word) => {
    const correctAnswers = array[targetLangCode as keyof Word] as string[];
    return {correctAnswers};
  };

  const setTestState = (wordBlock: Word): void => {
    const {wordToTranslate} = getSourceLang(wordBlock);
    const {correctAnswers} = getTargetLang(wordBlock);
    setWord(wordToTranslate);
    setCorrectAnswer(correctAnswers);
  };

  const setWordOrder = () => {
    if (wordOrder) {
      const randomBlock = getRandomWord(wordSlice.wordBlock);
      setTestState(randomBlock);
    } else {
      const orderedBlock = wordSlice.wordBlock[currentWordIndex];
      setTestState(orderedBlock);
    }
  };

  useEffect(() => {
    setWordOrder();
    if (isTestStarted) focusInputfield.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestStarted, currentWordIndex]);

  const nextWord = () => {
    const input: TestResult = {
      time: convertTimeToString(timeSpentOnTest),
      data: [
        ...results.data,
        {
          word,
          userAnswer,
          correctAnswer,
        },
      ],
    };
    if (currentWordIndex + 1 === wordNumber) {
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
            currentWordIndex + 1 === wordNumber ? 'Закончить тест' : 'Далее'
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
