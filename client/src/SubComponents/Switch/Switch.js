import './Switch.css'


export default function ({ isChecked, handleToggle ,checkedColor = '#06D6A0'}) {


    return (
        <>
            <input
                className="react-switch"
                id='react-switch'
                type='checkbox'
                checked={isChecked}
                onChange={handleToggle}
            />

            <label 
            style={{background: isChecked && checkedColor}}
            className="react-switch-label" 
            htmlFor='react-switch'
            >

                <span className="react-switch-button" />
            </label>
        </>
    )

}