import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/hooks/hooks';
import {TestSettings} from '@/components/TestSettings/TestSettings';
import {
  getVocabBlock,
  getVocabCategories,
} from '@/store/vocabulary-data/action-creators';
import {Results} from '@/components/Result';
import {WelcomeImg} from '@/components/WelcomeImg';
import {VocabularyTrainer} from '@/components/VocabularyTrainer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Loading} from '@/components/UI/Loading';
import {assignBlockName} from '@/utils/assignBlockName';
import {testStyles as s} from './styles';

export const Test = () => {
  const {isTestStarted, showResult} = useAppSelector(({TEST}) => TEST);
  const {blockList, chosenBlock, wordBlock} = useAppSelector(
    ({WORDS}) => WORDS,
  );
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.wordBlock) dispatch(getVocabBlock(params.wordBlock));
    if (!chosenBlock) {
      dispatch(getVocabCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params.wordBlock) {
      assignBlockName({
        blockList,
        wordBlock: params.wordBlock,
        dispatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockList]);

  if (!chosenBlock || wordBlock.length === 0) return <Loading />;

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
