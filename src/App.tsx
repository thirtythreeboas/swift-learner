import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import './css/general.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Link to="/" className="header">SWIFT-LEARNER</Link>
      <div className="main-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
