/** @jsxRuntime classic */
/** @jsx jsx */
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Loading} from '@/components/UI/Loading';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {TestSettings} from '@/components/TestSettings/TestSettings';
import {getWordBlock} from '@/store/word/ActionCreators';
import {Results} from '@/components/Result';
import {WelcomeImg} from '@/components/WelcomeImg';
import {VocabularyTrainer} from '@/components/VocabularyTrainer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {jsx} from '@emotion/react';
import {testStyles as s} from './styles';

export const Test = () => {
  const {chosenBlocks} = useAppSelector((state) => state.words);
  const {isTestStarted, showResult} = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.wordBlock) {
      dispatch(getWordBlock(params.wordBlock));
    }
  }, []);

  useEffect(() => {
    if (chosenBlocks === null) navigate('/');
  }, []);

  if (chosenBlocks === null) return <Loading />;

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
