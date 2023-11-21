import {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {setNextWord, setResult, completeTest} from '@/features/test/testSlice';
import {convertTimeToString} from '@/utils/convertTimeToString';
import {TestResult, Word} from '@/types/state';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
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
    const currentWord = currentWordIndex + 1;
    return wordNumber <= 0
      ? `${currentWord}/${wordSlice.wordBlock.length}`
      : `${currentWord}/${wordNumber}`;
  };

  const getRandomWord = (array: Word[]): Word => {
    let index = Math.floor(Math.random() * array.length);
    while (randomIndices.includes(index)) {
      index = Math.floor(Math.random() * array.length);
    }
    setRandomIndices((prevState) => [...prevState, index]);
    const block = array[index];
    return block;
  };

  const getSourceLangWord = (array: Word): string => {
    const wordBlock = array[sourceLangCode as keyof Word] as string[];
    const wordToTranslate = wordBlock[0];
    return wordToTranslate;
  };

  const getTargetLangWord = (array: Word): string[] => {
    const correctAnswers = array[targetLangCode as keyof Word] as string[];
    return correctAnswers;
  };

  const setTestState = (wordBlock: Word): void => {
    const wordToTranslate = getSourceLangWord(wordBlock);
    const correctAnswers = getTargetLangWord(wordBlock);
    setWord(wordToTranslate);
    setCorrectAnswer(correctAnswers);
  };

  const setWordOrder = (): void => {
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

  const pressToNextWord = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <div className={styles.inputBlock}>
          <TextField
            sx={{
              cursor: 'auto',
              pointerEvents: 'none',
              '& label': {backgroundColor: '#fff', paddingRight: '6px'},
            }}
            label='Переведите слово'
            value={word}
          />
          <TextField
            required
            id='outlined-required'
            ref={focusInputfield}
            InputLabelProps={{shrink: false}}
            value={userAnswer}
            onKeyDown={(e) => pressToNextWord(e)}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
        </div>
        <Button variant='contained' onClick={() => nextWord()}>
          {currentWordIndex + 1 === wordNumber ? 'Завершить' : 'Далее'}
        </Button>
      </div>

      <Badge
        badgeContent={displayTestProgress()}
        sx={{
          position: 'absolute',
          top: '0',
          right: '0',
        }}
        color='primary'
      />
    </>
  );
};
