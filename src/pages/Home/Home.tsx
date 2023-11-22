import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {chooseWordBlock, resetChosenBlocks} from '@/features/word/wordSlice';
import {restartTest} from '@/features/test/testSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {RouteNames} from '@/types/const';
import styles from './Home.module.scss';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const selected = words.chosenBlocks;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restartTest());
    dispatch(resetChosenBlocks());
  }, []);

  const setHover = (wordBlock: string): boolean => {
    return selected?.name === wordBlock;
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'auto',
        padding: '10px',
      }}
    >
      <div className={styles.homePage}>
        <Typography sx={{margin: '0 auto'}} variant='h5' gutterBottom>
          Выберите блок
        </Typography>
        <Link className={styles.linkBtn} to={RouteNames.WORDS}>
          Посмотреть слова
        </Link>
        <Link className={styles.linkBtn} to={RouteNames.TEST}>
          Начать тест
        </Link>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {words.blockList.map((item) => (
          <Button
            sx={{
              color: '#000',
              fontFamily: 'Scada, sans-serif',
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
            }}
            id={item.name}
            key={item.id}
            className={`${styles.wordBlock} ${
              setHover(item.name) ? styles.hover : ''
            }`}
            onClick={() => dispatch(chooseWordBlock(item))}
            onKeyDown={() => dispatch(chooseWordBlock(item))}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Container>
  );
};
