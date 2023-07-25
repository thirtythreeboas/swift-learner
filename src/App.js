import React, { useEffect } from 'react'
import styles from './styles/General.module.scss'
import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Test } from './pages/Test/Test'
import { ShowWords } from './components/ShowWords/ShowWords'
import { Loading } from './components/UI/Loading/Loading'
import { getWords } from './store/word'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const words = useSelector(state => state.words);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getWords())
  }, [])

  if (Object.keys(words.data).length === 0) return <Loading />
  
  return (
    <div className={styles.app}>
      <Link to="/" className={styles.header}>SWIFT-LEARNER</Link>
      <div className={styles.appContainer}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/words' element={<ShowWords />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;