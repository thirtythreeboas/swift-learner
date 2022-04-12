import React from 'react';
import '../css/words.scss';
import { inject, observer } from "mobx-react";
import { Word } from '../Logic';

const ShowWords: React.FC<any> = inject('logic')(observer((props) => {

  const { words, chosenBlocks } = props;

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
}));

export default ShowWords;
