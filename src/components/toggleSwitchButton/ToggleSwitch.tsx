import 'toggleSwitch.scss';

export const ToggleSwitchButton = () => {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
    )
}