import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import './css/general.scss';
import { inject, observer } from "mobx-react";

const App: React.FC<any> = inject('logic')(observer((props) => {

    const { logic } = props;

    return (
      <div className="App">
        <Link to="/" className="header">SWIFT-LEARNER</Link>
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
          </Routes>
        </div>
      </div>
    );
}))

export default App;
