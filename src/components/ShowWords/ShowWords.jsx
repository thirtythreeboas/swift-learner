import React from 'react'
import {useEffect} from 'react'
import styles from './ShowWords.module.scss'
import {resetChosenBlocks} from '../../store/word'
import {useSelector, useDispatch} from 'react-redux'

export const ShowWords = () => {
  const words = useSelector(state => state.words)
  const dispatch = useDispatch()
  const selected = words.chosenBlocks

  useEffect(() => {
    return () => {
      dispatch(resetChosenBlocks())
    }
  }, [])

  return (
    <div className={styles.wordsComponent}>
      <h3>{
        selected.map((e, i) => (
          `${e}${i === selected.length - 1 ? "" : ", "}`
        ))
      }</h3>
      <div className={styles.wordContainer}>
        {
          selected.map((e, i) => (
            words.data[e].map((elem, i) => (
              <dl className={styles.row} key={i}>
                <dt className={styles.leftCell}><span>{elem.eng[0]}</span></dt>
                <dd className={styles.rightCell}><span>{elem.rus[0]}</span></dd>
              </dl>
            ))
          ))
        }
      </div>
    </div>
  )
}
