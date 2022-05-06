import React from 'react';
import '../css/showWords.scss';
import { useAppSelector } from '../store/hooks';
import { Word } from '../store/word'; 

const ShowWords = () => {

  const words = useAppSelector(state => state.wordStorage);

  return (
    <div className="words-component">
      <h3>{
        words.chosenBlocks.map((e: string, i: number) => (
          `${e}${i === words.chosenBlocks.length - 1 ? "" : ", "}`
        ))
      }</h3>
      <div className="word-container">
        {
          words.chosenBlocks.map((e: string, i: number) => (
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
