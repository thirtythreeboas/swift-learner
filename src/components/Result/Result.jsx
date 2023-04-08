import React from 'react'
import styles from './Result.module.scss'
import {useSelector} from 'react-redux'

export const Results = () => {
    
  const test = useSelector(state => state.test)
  const results = test.results;

  const style = e => {
    const answer = e.answer.includes(e.input);
    return {backgroundColor: answer ? '#afebaf' : '#e37474'}
  }

  const getTime = seconds => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    const time = (mins <= 9 ? `0${mins}` : mins) + ':' + (secs <= 9 ? `0${secs}` : secs);
    return time;
  };

  const numberOfRightAnswers = () => {
    let right = results.data.filter(e => e.answer.includes(e.input));
    return right;
  }

  return (
    <>
      <div className={styles.testResults}>
        <div className={styles.testStatistics}>
          <span>Время: {getTime(results.time)}</span>
          <span>Правильные ответы: {numberOfRightAnswers().length + '/' + results.data.length}</span>
        </div>
        <div className={styles.resultData}>
          <dl className={styles.headerResult}>
            <dt className={styles.cell}><span>Слово</span></dt>
            <dd className={styles.cell}><span>Перевод</span></dd>
            <dd className={styles.cell}><span>Правильный ответ</span></dd>
          </dl>
          {
            results.data.map((e, i) =>
              <dl 
                className={styles.resultsRow}
                key={e.target + i}
              >
                <dt className={styles.cell} style={style(e)}><span>{e.target}</span></dt>
                <dd className={styles.cell} style={style(e)}><span>{e.input}</span></dd> 
                <dd className={styles.cell} style={{background: '#d7d97b'}}><span>{e.answer[0]}</span></dd>
              </dl>
            )
          }
        </div>
      </div>
    </>
  )
}
