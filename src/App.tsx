import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Test from './components/test/Test';
// import ShowWords from './components/ShowWords';
import './css/general.scss';
import { useNavigate } from "react-router-dom";

const App = () => {

    let navigate = useNavigate();

    // const redirectToMainPage = () => {
    //   logic.reset()
    //   navigate("/")
    // }

    return (
      <div className="App">
        <h1 className="header" 
        // onClick={() => redirectToMainPage()}
        >SWIFT-LEARNER</h1>
        <div className="main-container">
      
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