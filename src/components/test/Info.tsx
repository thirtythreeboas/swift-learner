import { useState, useEffect } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';

const Info = () => {

  useEffect(() => {
    let num = 0;
    let arr = word.chosenBlocks;
    arr.map((e: string) => {
      num += word.data[e].length;
    })
    setWordCount(num)
  }, [])
  
  library.add(fas)

  const arrowLookup: IconLookup = {
    prefix: 'fas', 
    iconName: 'repeat'
  };

  const arrowIconDefinition: IconDefinition = findIconDefinition(arrowLookup);

  const word = useAppSelector(selectWords);
  const test = useAppSelector(selectTest);

  const [mode, setMode] = useState<Boolean>(false);
  const [wordCount, setWordCount] = useState<Number>(0)

  const returnMode = () => {
    const switchBlock = document.getElementById('lang') as HTMLElement;
    const children = switchBlock.getElementsByTagName('span');
    children[0].innerHTML = mode === false ? 'Русский' : 'English';
    children[1].innerHTML = mode === false ? 'English' : 'Русский';
    setMode(!mode);
  }
  
  const timer = () => {
    return '00:00'
  }
  
  const amount = () => {
    let num = 0;
    let arr = word.chosenBlocks;
    arr.map((e: string) => {
      num += word.data[e].length;
    })
    return num;
  }

  const specifyWordCount = (e: {currentTarget: HTMLInputElement}) => {
    let value: string = e.currentTarget.value;
    let num: number = parseInt(value)
    setWordCount(num)
  }

  return (
    <div className="info-container">
      <h3>Параметры:</h3>
      <div className="details">
        <dl className="info-row" id="info-row-switch-lang">
          <dt className="left-info">
            Формат:
          </dt>
          <dd className="right-info"  id="lang">
            <span>English</span>
            <button className='switchLangButton' onClick={() => returnMode()}>
              <FontAwesomeIcon icon={arrowIconDefinition}/>
            </button>
            <span>Русский</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Блок: </span>
          </dt>
          <dd className="right-info">
            <span>{word.chosenBlocks}</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Размер блока: </span>
          </dt>
          <dd className="right-info">
            <span>{amount()}</span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info">
            <span>Количество слов: </span>
          </dt>
          <dd className="right-info">
            <span>
              <input type="text" id="word-count-input" onChange={e => specifyWordCount(e)}/>
            </span>
          </dd>
        </dl>
        <dl className="info-row">
          <dt className="left-info"><span>Таймер: </span></dt>
          <dd className="right-info"><span>{timer()}</span></dd>
        </dl>
      </div>
      <button className='start-test'>Начать</button>
    </div>
  )
};

export default Info;