import { useEffect, useRef, useState } from "react";
import "./Autocomplete.css";
import useToggle from "../../Hooks/useToggle";
import Input from "../Input/Input";
export default function Autocomplete({
  value = "",
  set = () => {},
  options = [],
  placeholder = "",
  style = {},
  inputProps = {},
}) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useToggle();

  useEffect(() => {
    setFilteredOptions(
      value ? options.filter((op) => op.includes(value)) : options
    );
  }, [value]);

  return (
    <div
      onFocus={(e) => {
        setOpen();
      }}
      className="autocomplete-wrapper"
      style={{ ...style }}
    >
      <input
      className="autocomplete-input"
        value={value}
        onChange={(e) => set(e, e.target.value)}
        placeholder={placeholder}
        {...inputProps}
      />
      {open && (
        <div className="autocomplete-menu">
          {filteredOptions?.map((item, index) => (
            <span
              onClick={(e) => {
                set(e, item);
                setOpen();
              }}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
