import {useEffect} from 'react'
import styles from './Home.module.scss'
import {useNavigate} from "react-router-dom"
import {chooseWordsBlock} from '@/store/word'
import {useAppSelector, useAppDispatch} from "@/app/hooks"

export const Home = () => {
  const words = useAppSelector(state => state.words);
  const selected = words.chosenBlocks;
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const startTest = () => {
    if (selected.length === 0) return;
    navigate("/test")
  }

  const showWords = () => {
    if (selected.length === 0) return;
    navigate("/words")
  }

  const setHover = (wordBlock: string) => {
    return selected.includes(wordBlock);
  }

  useEffect(() => {
    console.log(words.chosenBlocks)
  }, [words.chosenBlocks])

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <h3>Выберите блок</h3>
        <button className={styles.showWords} onClick={showWords}>Посмотреть слова</button>
        <button onClick={startTest}>Начать тест</button>
      </div>
      <div className={styles.blockSelection}>
        {
          Object.keys(words.data).map((item, i) => (
            <div
              key={item + i}
              id={item}
              className={`${styles.wordBlock} ${setHover(item) ? styles.hover : ''}`}
              // gotta find out the way to do the same differently
              onClick={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
            >
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
}
