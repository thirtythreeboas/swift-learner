import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import {getWordBlock} from '@/features/thunks';
import {useLocation} from 'react-router-dom';
import styles from './Dictionary.module.scss';

export const Dictionary = () => {
  const words = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  // interface Props extends RouteComponentProps<
  //   {myParamProp?: string},
  //   any,
  //   {myStateProp?: string}
  //   > {myNormalProp: boolean}

  // const {state} = useLocation<Kek>();

  useEffect(() => {
    // if (state && typeof state === 'string') {
    // dispatch(getWordBlock(state?.chosenBlock));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
