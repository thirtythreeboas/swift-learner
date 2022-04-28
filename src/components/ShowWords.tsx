import React from 'react';
import '../css/showWords.scss';
import { Word } from '../../store';

const ShowWords = () => {

  return (
    <div className="words-component">
      <h3>{
        chosenBlocks.map((e: string, i: number) => (
          `${e}${i === chosenBlocks.length - 1 ? "" : ", "}`
        ))
      }</h3>
      <div className="word-container">
        {
          chosenBlocks.map((e: string, i: number) => (
            words[e].map((elem: Word, i: number) => (
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
