import {FC} from 'react';
import styles from './SwitchLangs.module.scss';

export const SwitchLangs = (changeLangs: FC) => {
  return (
    <label htmlFor='switch' className={styles.switch}>
      <input type='checkbox' id='switch' onClick={changeLangs} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  );
};
