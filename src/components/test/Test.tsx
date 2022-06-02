import { useEffect } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { resetChosenBlocks } from '../../store/word';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Info from './Info';

const Test = () => {
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectTest);

  useEffect(() => {
    return () => {
      console.log('kek');
      dispatch(resetChosenBlocks())
    }
  }, [])
  
  return (
    <div className="test">
      <Info />
      
    </div>
  )
};

export default Test;
