import React from 'react';
import '../../css/test.scss';
import { inject, observer } from "mobx-react";
import Info from './Info';
import { Word } from '../../Logic';

const Test: React.FC<any> = inject('logic')(observer((props) => {

  const { words, chosenBlocks } = props;

  return (
    <div className="test">
      <Info />
      
    </div>
  )
}));

export default Test;
