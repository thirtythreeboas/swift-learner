import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {chooseWordsBlock} from '../../store/word'
import {useSelector, useDispatch} from 'react-redux'
import styles from './Home.module.scss'

export const Home = () => {
  const words = useSelector(state => state.words);
  const selected = words.chosenBlocks;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const startTest = () => {
    if (selected.length === 0) return;
    navigate("/test")
  }

  const showWords = () => {
    if (selected.length === 0) return;
    navigate("/words")
  }

  useEffect(() => {
  }, [words.chosenBlocks])

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <h3>Выберите блок</h3>
        <button className={styles.showWords} onClick={() => showWords()}>Показать слова</button>
        <button onClick={() => startTest()}>Начать тест</button>
      </div>
      <div className={styles.blockSelection}>
        {
          Object.keys(words.data).map((item, i) => (
            <div
              key={i}
              id={item}
              className={`${styles.wordBlock} ${selected.includes(item) ? styles.hover : ''}`}
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
