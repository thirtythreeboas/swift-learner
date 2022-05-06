import React, { useEffect } from 'react';
import './loadingCss.scss';

const LoadingPage = () => {
  useEffect(() => {
    let elem = document.getElementById('loading') as HTMLDivElement | null;

    const interval = setInterval(() => {
      if (elem === null) return;
      if (elem.innerText.length - 7 ===  3) elem.innerHTML = 'Loading';
      else elem.innerText += '.';
    }, 500)

    return () => clearInterval(interval);
  }, [])

  return (
    <div id="loading">Loading</div>
  );
};

export default LoadingPage;
