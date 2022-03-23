import React from 'react';
import '../css/home.scss';
import { Link } from 'react-router-dom';

import instance from '../logic';

const Home: React.FC = () => {

  instance.getData();


  return (
    <div className="container">
      <div className='home-page'>
        <h3>Выберите блок</h3>
        <button>Начать тест</button>
        <button>Пройти тест со всеми блоками</button>
      </div>
      <div className='block-selection'>
        <p>{JSON.stringify(instance.words)}</p>
      </div>
    </div>
  )
}

export default Home;
// {
//   arr.map((item, i) => (
//     <Link to={`/${item}`} key={i} className="word-block">{item}</Link>
//   ))
// }
