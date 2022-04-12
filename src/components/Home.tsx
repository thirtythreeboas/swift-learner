import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/home.scss';
import { inject, observer } from "mobx-react";

const Home: React.FC<any> = inject('logic')(observer((props) => {

  const { words, getData, chooseBlock, chosenBlocks } = props;

  useEffect(() => {
    getData()
  }, [])

  let navigate = useNavigate();

  const startTest = () => {
    if (chosenBlocks.length === 0) return;
    navigate("/test")
  }

  const showWords = () => {
    if (chosenBlocks.length === 0) return;
    navigate("/words")
  }

  return (
    <div className="container">
      <div className='home-page'>
        <h3>Выберите блок</h3>
        <button className="show-words" onClick={() => showWords()}>Показать слова</button>
        <button onClick={() => startTest()}>Начать тест</button>
        <button>Пройти тест со всеми блоками</button>
      </div>
      <div className='block-selection'>
        {
          Object.keys(words).map((item: string, i: number) => (
            <div
              key={i}
              id={item}
              className="word-block"
              onClick={e => chooseBlock(e)}
            >
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
}));

export default Home;
