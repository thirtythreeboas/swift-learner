import { useEffect } from 'react';
import './App.css';
import './css/general.scss';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Home from './components/Home';
import Test from './components/test/Test';
import ShowWords from './components/ShowWords';
import LoadingPage from './components/loading/LoadingPage';
import { selectWords } from './store';
import { getWords, resetChosenBlocks } from './store/word';

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(getWords());
  }, [])
  
  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(resetChosenBlocks());
    }
  }, [])
  
  if (Object.keys(words.data).length === 0) return <LoadingPage />
  
  return (
    <div className="App">
      <Link to="/" className="header">SWIFT-LEARNER</Link>
      <div className="main-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/words' element={<ShowWords />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;