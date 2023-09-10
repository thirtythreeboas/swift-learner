import {useEffect} from 'react'
import styles from './Test.module.scss'
import {resetChosenBlocks} from '@/store/word'
import {Details} from '@/components/Details'
import {TestLogic} from '@/components/TestLogic'
import {Loading} from '@/components/UI/Loading'
import {useNavigate} from "react-router-dom"
import {useAppSelector, useAppDispatch} from '@/app/hooks'

export const Test = () => {
  const words = useAppSelector(state => state.words);
  const dispatch = useAppDispatch();
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
      <Details />
      <TestLogic />
    </div>
  )
}
