import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {getWordBlock} from '@/features/thunks';
import styles from './WordList.module.scss';

export const WordList = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (words.chosenBlocks && words.chosenBlocks.path) {
      dispatch(getWordBlock(words.chosenBlocks.path));
    }
  }, []);

  return (
    <div className={styles.wordsComponent}>
      <h3>{words.chosenBlocks?.name}</h3>
      <div className={styles.wordContainer}>
        {words.wordBlock.map((word) => (
          <dl className={styles.row} key={word.id}>
            <dt className={styles.leftCell}>
              <span>{word.eng[0]}</span>
            </dt>
            <dd className={styles.rightCell}>
              <span>{word.rus[0]}</span>
            </dd>
          </dl>
        ))}
      </div>
    </div>
  );
};
