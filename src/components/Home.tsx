import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import '../css/home.scss';
// import { selectWords } from "../store";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { chooseWordsBlock } from '../store/word';

const Home = () => {

  const blocksOfWords = useAppSelector(state => state.wordStorage);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const startTest = () => {
    if (blocksOfWords.chosenBlocks.length === 0) return;
    navigate("/test")
  }

  const showWords = () => {
    if (blocksOfWords.chosenBlocks.length === 0) return;
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
          Object.keys(blocksOfWords.data).map((item: string, i: number) => (
            <div
              key={i}
              id={item}
              className="word-block"
              // onClick={(e: React.MouseEvent<Element, MouseEvent>) => dispatch(chooseWordsBlock(e))}
              onClick={(e: HTMLDivElement) => dispatch(chooseWordsBlock(e))}
            >
              {item}
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default Home;
