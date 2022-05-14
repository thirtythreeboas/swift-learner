// import '../../css/test.scss';
// import { selectWords, selectTest } from '../../store';
// import { useAppSelector, useAppDispatch } from '../../store/hooks';
// import React, { useState, useEffect } from 'react';

// const Info = () => {

//   const word = useAppSelector(selectWords);
//   const test = useAppSelector(selectTest);

//   const [mode, setMode] = useState(false);

//   const returnMode = () => {
//     return 'Eng to Rus'
//   }
  
//   const timer = () => {
//     return '00:00'
//   }
  
//   const amount = () => {
//     let num = 0;
//     let arr = word.chosenBlocks;
//     arr.map((e: string) => {
//       num += word.data[e].length;
//     })
//     console.log(num);
//     return num;
//   }

//   return (
//     <div className="info-block">
//       <h3>Параметры:</h3>
//       <div className="details">
//         <dl className="info-row">
//           <dt className="left-info"><span>Формат:</span></dt>
//           <dd className="right-info"><span>{returnMode()}</span></dd>
//         </dl>
//         <dl className="info-row">
//           <dt className="left-info"><span>Блок: </span></dt>
//           <dd className="right-info"><span>{word.chosenBlocks}</span></dd>
//         </dl>
//         <dl className="info-row">
//           <dt className="left-info"><span>Количество слов: </span></dt>
//           <dd className="right-info"><span>{amount()}</span></dd>
//         </dl>
//         <dl className="info-row">
//           <dt className="left-info"><span>Таймер: </span></dt>
//           <dd className="right-info"><span>{timer()}</span></dd>
//         </dl>
//       </div>
//     </div>
//   )
// };

// export default Info;
export default {};