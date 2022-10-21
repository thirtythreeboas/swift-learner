import { useEffect } from 'react';
import './App.css';
import './css/general.scss';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Home from './components/Home';
import TestContainer from './components/test/TestContainer';
import ShowWords from './components/ShowWords';
import LoadingPage from './components/loading/LoadingPage';
import { selectWords } from './store';
import { getWords } from './store/word';

const App = () => {
  
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getWords());
    }, [])
  
  if (Object.keys(words.data).length === 0) return <LoadingPage />
  
  return (
    <div className="App">
      <Link to="/" className="header">SWIFT-LEARNER</Link>
      <div className="app-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<TestContainer />} />
          <Route path='/words' element={<ShowWords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;