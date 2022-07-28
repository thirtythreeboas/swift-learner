import { useEffect } from 'react';
import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { resetChosenBlocks } from '../../store/word';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Info from './Info';
import Test from './Test';

const TestContainer = () => {
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectTest);

  useEffect(() => {
    return () => {
      dispatch(resetChosenBlocks())
    }
  }, [])
  
  return (
    <div className="test">
      <Info />
      <Test />
    </div>
  )
};

export default TestContainer;
