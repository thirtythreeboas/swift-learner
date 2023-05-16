import styles from './SwitchLangs.module.scss';

export const SwitchLangs = changeLangs => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" onClick={changeLangs} />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}