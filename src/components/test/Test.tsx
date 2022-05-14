import '../../css/test.scss';
import { selectWords, selectTest } from '../../store';
import { useAppSelector } from '../../store/hooks';
import Info from './Info';

const Test = () => {
  const words = useAppSelector(selectWords);
  const test = useAppSelector(selectTest);
  
  return (
    <div className="test">
      <Info />
      
    </div>
  )
};

export default Test;
