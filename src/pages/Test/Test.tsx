/** @jsxRuntime classic */
/** @jsx jsx */
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks/hooks';
import {setCurrentBlockName} from '@/store/vocabulary-data/vocabulary-data';
import {TestSettings} from '@/components/TestSettings/TestSettings';
import {getBlockNames} from '@/store/vocabulary-data/action-creators';
import {Results} from '@/components/Result';
import {WelcomeImg} from '@/components/WelcomeImg';
import {VocabularyTrainer} from '@/components/VocabularyTrainer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {jsx} from '@emotion/react';
import {BlockListElement} from '@/types/state';
import {testStyles as s} from './styles';

export const Test = () => {
  const {isTestStarted, showResult} = useAppSelector(({TEST}) => TEST);
  const {blockList} = useAppSelector(({WORDS}) => WORDS);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.wordBlock) {
      dispatch(getBlockNames(params.wordBlock));
    }
  }, []);

  useEffect(() => {
    const block: BlockListElement | undefined = blockList.find(
      (elem) => elem.path === params.wordBlock,
    );
    if (block) {
      dispatch(setCurrentBlockName(block));
    }
  }, [blockList]);

  return (
    <Container css={s.container}>
      <TestSettings />
      <Box css={s.contentWrapper}>
        {!isTestStarted && <WelcomeImg />}
        {isTestStarted && !showResult && <VocabularyTrainer />}
        {isTestStarted && showResult && <Results />}
      </Box>
    </Container>
  );
};
