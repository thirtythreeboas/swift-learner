import '../../css/test.scss';
import { useAppSelector } from '../../store/hooks';
import Info from './Info';

const Test = () => {
  const words = useAppSelector(state => state.wordStorage);
  return (
    <div className="test">
      <Info />
      
    </div>
  )
};

export default Test;
