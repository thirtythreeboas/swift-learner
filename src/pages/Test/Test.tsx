import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Loading} from '@/components/UI/Loading';
import {useAppDispatch, useAppSelector} from '@/app/hooks';
import {TestSettings} from '@/components/TestSettings/TestSettings';
import {getWordBlock} from '@/features/thunks';
import {Results} from '@/components/Result';
import {WelcomeImg} from '@/components/WelcomeImg';
import {VocabularyTrainer} from '@/components/VocabularyTrainer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const Test = () => {
  const {chosenBlocks} = useAppSelector((state) => state.words);
  const {isTestStarted, showResult} = useAppSelector((state) => state.test);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (chosenBlocks && chosenBlocks.path)
      dispatch(getWordBlock(chosenBlocks.path));
  }, []);

  useEffect(() => {
    if (chosenBlocks === null) navigate('/');
  }, []);

  if (chosenBlocks === null) return <Loading />;

  return (
    <Container
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <TestSettings />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {!isTestStarted && <WelcomeImg />}
        {isTestStarted && !showResult && <VocabularyTrainer />}
        {isTestStarted && showResult && <Results />}
      </Box>
    </Container>
  );
};
