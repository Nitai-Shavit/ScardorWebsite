import "./InputFilter.css";

export default function InputFilter({ title, dir = "row", type, args }) {
  const radio = () => {
    return args.options.map((item,index) => (
      <div key={index} className="radio-wrapper">
        <input
          id={item.id}
          type="radio"
          name={args.name}
          value={item.value}
          onChange={() => args.set(item.value)}
          checked={args.get === item.value}
        />
        <label htmlFor={item.id}>{item.label}</label>
      </div>
    ));
  };

  const toggle = () => {
    return (
      <button
        className="toggle-button"
        style={{
          backgroundColor:
            args.get === 0 ? "gray" : args.get === 1 ? "green" : "red",
        }}
        onClick={() => args.set()}
      >
        {args.get === 0 ? "-" : args.get === 1 ? "yes" : "no"}
      </button>
    );
  };

  const fields = new Map();
  fields.set("radio", radio);
  fields.set("toggle", toggle);

  return (
    <div className="input-filter-wrapper">
      <div className="title-wrapper">
        <label>{title}</label>
      </div>
      <div className="input-filter-container" style={{ flexDirection: dir }}>
        {fields.get(type).call()}
      </div>
    </div>
  );
}
