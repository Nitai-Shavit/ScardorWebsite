import "./Input.css";
import useToggle from "../../Hooks/useToggle";

export default function Input({
  type = "text",
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  inputStyle = {},
  style = {},
  legendStyle = {},
}) {
  const [focus, setFocus] = useToggle();

  return (
    <fieldset className="stylized-input" style={style}>
      <legend
        style={{
          fontSize: focus ? "2vmin" : "0",
          maxWidth: focus ? "100%" : "0px",
          ...legendStyle,
        }}
      >
        {label}
      </legend>
      <input
        style={inputStyle}
        type={type}
        value={value}
        name={name}
        placeholder={!focus && label}
        onChange={onChange}
        onFocus={setFocus}
        onBlur={setFocus}
      />
    </fieldset>
  );
}
