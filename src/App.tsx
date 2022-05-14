import { useEffect } from 'react';
import './App.css';
import './css/general.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import Home from './components/Home';
import Test from './components/test/Test';
import ShowWords from './components/ShowWords';
import LoadingPage from './components/loading/LoadingPage';
import { selectWords } from './store';
import { useNavigate } from "react-router-dom";
import { getWords } from './store/word';
import { resetChosenBlocks } from './store/word';

const App = () => {

  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const url: string = 'https://thirtythreeboas.github.io/data/dictionary.json';

  useEffect(() => {
    dispatch(getWords());
  }, [])


  const navigate = useNavigate();
  console.log();
  

  // const redirectToMainPage = () => {
  //   dispatch(resetChosenBlocks());
  //   navigate("/");
  // }

  if (Object.keys(words.data).length === 0) return <LoadingPage />
  
  return (
    <div className="App">
      {/* <h1 className="header" 
      // onClick={() => redirectToMainPage()}
      >SWIFT-LEARNER</h1> */}
      <Link to="/" className="header">SWIFT-LEARNER</Link>
      <div className="main-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/words' element={<ShowWords />}/>
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