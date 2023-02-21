import React, {useEffect} from 'react'
import styles from './Test.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {resetChosenBlocks} from '../../store/word'
import {TestSettings} from '../../components/TestSettings/TestSettings'
import {TestLogic} from '../../components/TestLogic/TestLogic'
import { Loading } from '../../components/UI/Loading/Loading'
import {useNavigate} from "react-router-dom"

export const Test = () => {
  const words = useSelector(state => state.words);
  const test = useSelector(state => state.test);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (words.chosenBlocks.length === 0) {
      navigate("/")
    }
    return () => {
      dispatch(resetChosenBlocks())
    }
  }, []);

  if (words.chosenBlocks.length === 0) return <Loading />

  return (
    <div className={styles.test}>
      <TestSettings />
      <TestLogic />
    </div>
  )
}
