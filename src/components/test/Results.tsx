import '../../css/results.scss';
import { selectTest } from '../../store';
import { useAppSelector } from '../../store/hooks';

interface Data {
  target: string;
  input: string;
  answer: string[];
}

const Results = () => {
  
  const test = useAppSelector(selectTest);
  const results = test.results;

  const style = (e: {target: string, input: string, answer: string[]}) => {
    const answer = e.answer.includes(e.input);
    return {backgroundColor: answer ? '#74d974' : '#c13d3d'}
  }

  const getTime = (seconds: number) => {
    let mins: number = Math.floor(seconds / 60);
    let secs: number = seconds % 60;
    const time = (mins <= 9 ? `0${mins}` : mins) + ':' + (secs <= 9 ? `0${secs}` : secs);
    return time;
  };

  const numberOfRightAnswers = () => {
    let right = results.data.filter((e: Data) => e.answer.includes(e.input));
    return right;
  }

  return (
    <>
      <div className='test-results'>
      <div className='test-statistics'>
        <span>Время: {getTime(results.time)}</span>
        <span>Правильные ответы: {numberOfRightAnswers().length + '/' + results.data.length}</span>
      </div>
        {
          results.data.map((e: {target: string, input: string, answer: string[]}, i: number) =>
            <dl className="results-row" key={e.target + i} style={style(e)}>
              <dt className="results-left"><span>{e.target}</span></dt>
              <dd className="results-right"><span>{e.input}</span></dd>
            </dl>
          )
        }
      </div>
    </>
  )
};

export default Results;
