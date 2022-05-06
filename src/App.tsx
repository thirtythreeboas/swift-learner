import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Home from './components/Home';
// import Test from './components/test/Test';
// import ShowWords from './components/ShowWords';
import { selectWords } from './store';
import './css/general.scss';
import { useNavigate } from "react-router-dom";
import LoadingPage from './components/loading/LoadingPage';
import { getWords } from './store/word';
import { resetChosenBlocks, chooseWordsBlock } from './store/word';

const App = () => {

  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getWords());
    }, 2000)
    return () => clearTimeout(timer);
  }, [])

  let navigate = useNavigate();

  const redirectToMainPage = () => {
    dispatch(resetChosenBlocks());
    navigate("/");
  }

  if (words === undefined) return <LoadingPage />
  
  return (
    <div className="App">
      <h1 className="header" 
      onClick={() => redirectToMainPage()}
      >SWIFT-LEARNER</h1>
      <div className="main-container">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

{/* <Routes>
  <Route path='/' element={
    <Home
      words={logic.words}
      getData={logic.getData}
      chooseBlock={logic.chooseBlock}
      chosenBlocks={logic.chosenBlocks}
  />}/>
  <Route path='/test' element={
    <Test
      words={logic.words}
      chosenBlocks={logic.chosenBlocks}
  />}/>
  <Route path='/words' element={
    <ShowWords
      words={logic.words}
      chosenBlocks={logic.chosenBlocks}
  />}/>
</Routes> */}