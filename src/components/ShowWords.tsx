import { useEffect } from 'react';
import '../css/showWords.scss';
import { selectWords } from '../store';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Word, resetChosenBlocks } from '../store/word';

const ShowWords = () => {

  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const selected = words.chosenBlocks;

  useEffect(() => {
    return () => {
      dispatch(resetChosenBlocks())
    }
  }, [])

  return (
    <div className="words-component">
      <h3>{
        selected.map((e: string, i: number) => (
          `${e}${i === selected.length - 1 ? "" : ", "}`
        ))
      }</h3>
      <div className="word-container">
        {
          selected.map((e: string, i: number) => (
            words.data[e].map((elem: Word, i: number) => (
              <dl className="row" key={i}>
                <dt className="left-cell"><span>{elem.eng[0]}</span></dt>
                <dd className="right-cell"><span>{elem.rus[0]}</span></dd>
              </dl>
            ))
          ))
        }
      </div>
    </div>
  )
};

export default ShowWords;
