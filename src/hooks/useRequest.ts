import {useState, useEffect} from 'react';

const useRequest = <T>(): void => {
  const [data, setData] = <T | null>null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
};

export default useRequest;
