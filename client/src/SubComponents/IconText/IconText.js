import "./IconText.css";

export default function IconText({
  src = false,
  alt = "",
  title = "",
  fontSize = "1.2rem",
  content,
  style,
}) {
  return (
    <div className="icon-text-wrapper" style={{ ...style }}>
      {src && <img src={src} alt={alt} />}
      <label
        style={{
          width: src ? "80%" : "100%",
          fontSize: fontSize,
          display: "flex",
          alignItems: "center",
          flexDirection: style?.flexDirection ? style.flexDirection : "column",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            width: "fit-content",
          }}
        >
          {title}
        </span>
        <div className="content">{content}</div>
      </label>
    </div>
  );
}
