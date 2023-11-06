import {useEffect} from 'react';
// import {resetChosenBlocks} from '@/features/word/wordSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import styles from './ShowWords.module.scss';

export const ShowWords = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();
  const selected: string[] = words.chosenBlocks;

  useEffect(() => {
    // dispatch(resetChosenBlocks());
  }, [dispatch]);

  return (
    <div className={styles.wordsComponent}>
      <h3>
        {selected.map((e, i) => `${e}${i === selected.length - 1 ? '' : ', '}`)}
      </h3>
      <div className={styles.wordContainer}>
        {selected.map((e) =>
          words.data[e].map((elem) => (
            <dl className={styles.row} key={elem.eng[0]}>
              <dt className={styles.leftCell}>
                <span>{elem.eng[0]}</span>
              </dt>
              <dd className={styles.rightCell}>
                <span>{elem.rus[0]}</span>
              </dd>
            </dl>
          )),
        )}
      </div>
    </div>
  );
};
