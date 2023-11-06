import {useNavigate} from 'react-router-dom';
import {chooseWordsBlock} from '@/features/word/wordSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks';
import styles from './Home.module.scss';

export const Home = () => {
  const words = useAppSelector((state) => state.words);
  const selected = words.chosenBlocks;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const startTest = () => {
    if (selected.length === 0) return;
    navigate('/test');
  };

  const showWords = () => {
    if (selected.length === 0) return;
    navigate('/words');
  };

  const setHover = (wordBlock: string) => {
    return selected.includes(wordBlock);
  };

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <h3>Выберите блок</h3>
        <button type='button' className={styles.showWords} onClick={showWords}>
          Посмотреть слова
        </button>
        <button type='button' onClick={startTest}>
          Начать тест
        </button>
      </div>
      <div className={styles.blockSelection}>
        {Object.keys(words.data).map((item) => (
          <div
            role='menuitem'
            tabIndex={0}
            key={item}
            id={item}
            className={`${styles.wordBlock} ${
              setHover(item) ? styles.hover : ''
            }`}
            // gotta find out the way to do the same differently
            onClick={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
            onKeyDown={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
