import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {chooseWordBlock, resetChosenBlocks} from '@/features/word/wordSlice';
import {restartTest} from '@/features/test/testSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {Button} from '@mui/material';
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

  const setHover = (wordBlock: string) => {
    return selected?.name === wordBlock;
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
      </div>
    </div>
  );
};
