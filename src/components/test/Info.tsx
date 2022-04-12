import React from 'react';
import '../../css/test.scss';
import { inject, observer } from "mobx-react";

const Info: React.FC<any> = inject('logic')(observer((props) => {

  // const { words, chosenBlocks } = props;

  return (
    <div className="info-block">
      <h3>формат:</h3>
      <div className="details">
        <dl className="info-row">
          <dt className="left-info"><span>Русский</span></dt>
          <dd className="right-info"><span>Английский</span></dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info"><span>Блок: </span></dt>
          <dd className="right-info"><span>Apple Juice</span></dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info"><span>Количество слов: </span></dt>
          <dd className="right-info"><span>50</span></dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info"><span>Таймер: </span></dt>
          <dd className="right-info"><span>00:00</span></dd>
        </dl>
      </div>
    </div>
  )
}));

export default Info;
