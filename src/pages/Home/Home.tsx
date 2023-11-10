import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {chooseWordsBlock, resetChosenBlocks} from '@/features/word/wordSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {Button} from '@mui/material';
import {RouteNames} from '@/types/pages';
import styles from './Home.module.scss';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const selected = words.chosenBlocks;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetChosenBlocks());
  }, []);

  const setHover = (wordBlock: string) => {
    return selected.includes(wordBlock);
  };

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <h3>Выберите блок</h3>
        <Link className={styles.linkBtn} to={RouteNames.WORDS}>
          Посмотреть слова
        </Link>
        <Link className={styles.linkBtn} to={RouteNames.TEST}>
          Начать тест
        </Link>
      </div>
      <div className={styles.blockSelection}>
        {Object.keys(words.data).map((item) => (
          <Button
            sx={{
              color: '#000',
              fontFamily: 'Scada, sans-serif',
              '&:hover': {
                backgroundColor: '#1976d2',
                color: '#fff',
              },
            }}
            id={item}
            key={item}
            className={`${styles.wordBlock} ${
              setHover(item) ? styles.hover : ''
            }`}
            onClick={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
            onKeyDown={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};
