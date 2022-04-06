import React from 'react';
import '../css/test.scss';
import { inject, observer } from "mobx-react";
import { Word } from '../Logic';

const Test: React.FC<any> = inject('logic')(observer((props) => {

  const { words, chosenBlocks } = props;

  return (
    <div className="test">
      {
        chosenBlocks.map((e: string, i: number) => (
          words[e].map((elem: Word, i: number) => (
            <dl className="" key={i}>
              <dt className=""><span>{elem.eng}</span></dt>
              <dd className="">{elem.rus}</dd>
            </dl>
          ))
        ))
      }
    </div>
  )
}));

export default Test;
