import './toggleSwitch.scss';



export const ToggleSwitchButton = ({ changeLangs }: any) => {
    return (
        <label className="switch">
            <input type="checkbox" onClick={changeLangs} />
            <span className="slider round"></span>
        </label>
    )
}