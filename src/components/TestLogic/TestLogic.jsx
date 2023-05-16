import styles from './TestLogic.module.scss'
import {useSelector} from 'react-redux'
import {Results} from '../Result'
import {WelcomeImg} from '../WelcomeImg'
import {WordTrainer}  from '../WordTrainer'

export const TestLogic = () => {
  const test = useSelector(state => state.test)

  return (
    !test.startTest ?
    <WelcomeImg />
    :
    <div className={styles.testContainer}>
      {
        test.closeTestWindow 
        ? <WordTrainer />
        : <Results />
      }
    </div>
  )
}
