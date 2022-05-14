import { useNavigate } from "react-router-dom";
import '../css/home.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectWords } from "../store";
import { chooseWordsBlock } from '../store/word';

const Home = () => {

  const words = useAppSelector(selectWords);
  const selected = words.chosenBlocks;
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const startTest = () => {
    if (selected.length === 0) return;
    navigate("/test")
  }

  const showWords = () => {
    if (selected.length === 0) return;
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
          Object.keys(words.data).map((item: string, i: number) => (
            <div
              key={i}
              id={item}
              className="word-block"
              // gotta find out the way to do the same differently
              onClick={(e) => dispatch(chooseWordsBlock(e.currentTarget.id))}
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
