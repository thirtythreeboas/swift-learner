import React, {useEffect, useState, useRef} from 'react';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import {
  setNextWord,
  setResult,
  completeTest,
} from '@/store/test-process/test-process';
import {Word, UserAnswersList} from '@/types/state';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import {vocabStyles as s} from './style';

export const VocabularyTrainer = () => {
  const wordSlice = useAppSelector(({WORDS}) => WORDS);
  const {
    wordNumber,
    currentWordIndex,
    targetLangCode,
    sourceLangCode,
    isTestStarted,
    wordOrder,
  } = useAppSelector(({TEST}) => TEST);

  const dispatch = useAppDispatch();
  const focusInputfield = useRef<HTMLInputElement | null>(null);

  const [word, setWord] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string[]>([]);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);

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
    if (wordOrder === 'random') {
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
    const answers: UserAnswersList = {
      word,
      userAnswer,
      correctAnswer,
    };
    if (currentWordIndex + 1 === wordNumber) {
      dispatch(completeTest());
      dispatch(setResult(answers));
    } else {
      dispatch(setNextWord());
      dispatch(setResult(answers));
    }
    setUserAnswer('');
  };

  const pressToNextWord = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') nextWord();
  };

  return (
    <>
      <Box css={s.inputBlock}>
        <TextField css={s.textfield} label='Переведите слово' value={word} />
        <TextField
          required
          id='outlined-required'
          inputRef={focusInputfield}
          InputLabelProps={{shrink: false}}
          value={userAnswer}
          onKeyDown={(e) => pressToNextWord(e)}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      </Box>
      <Button variant='contained' onClick={() => nextWord()}>
        {currentWordIndex + 1 === wordNumber ? 'Завершить' : 'Далее'}
      </Button>

      <Badge
        badgeContent={displayTestProgress()}
        css={s.badge}
        color='primary'
      />
    </>
  );
};
