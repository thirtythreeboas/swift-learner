import {useEffect} from 'react'
import styles from './Loading.module.scss'

export const Loading = () => {
  useEffect(() => {
    const elem = document.getElementById('loading')

    const interval = setInterval(() => {
      if (elem === null) return;
      if (elem.innerText.length - 7 ===  3) elem.innerHTML = 'Loading';
      else elem.innerText += '.';
    }, 500)

    return () => clearInterval(interval);
  }, [])

  return (
    <div id={styles.loading}>Loading</div>
  );
}