import { useEffect } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { resetChosenBlocks } from '../../store/word';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const Test = () => {
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectTest);

  useEffect(() => {
    
  }, [])
  
  return (
    <div className="test-container">
      <div className='input-container'>
        <div className='input-block'>
          <span id='word-to-translate'></span>
          <input type="text" id='get-word-input' className='word-to-enter' />
        </div>
        <button className='input-word-button'>Далее</button>
      </div>

      <div className='amount-badges'>
        <span>2/20</span>
      </div>
    </div>
  )
};

export default Test;
