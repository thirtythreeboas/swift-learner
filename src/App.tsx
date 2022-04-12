import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/test/Test';
import ShowWords from './components/ShowWords';
import './css/general.scss';
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const App: React.FC<any> = inject('logic')(observer((props) => {

    const { logic } = props;

    let navigate = useNavigate();

    const redirectToMainPage = () => {
      logic.reset()
      navigate("/")
    }

    return (
      <div className="App">
        <h1 className="header" onClick={() => redirectToMainPage()}>SWIFT-LEARNER</h1>
        <div className="main-container">
          <Routes>
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
          </Routes>
        </div>
      </div>
    );
}))

export default App;
