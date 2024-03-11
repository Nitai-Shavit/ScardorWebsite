import useToggle from "../../../Hooks/useToggle";
import "./TagBox.css";

export default function TagBox({
  id = "",
  title = "WIP",
  tags = [],
  filters = {},
  setFilters = () => {},
}) {
  const [open, setOpen] = useToggle(false);

  const toggleTag = (tag) => {
    filters[id].includes(tag)
      ? setFilters({
          ...filters,
          [id]: [...filters[id].filter((t) => t !== tag)],
        })
      : setFilters({ ...filters, [id]: [...filters[id], tag] });
  };

  return (
    Object.keys(filters).length && (
      <div
        id={`tag-wrap-${title}`}
        className={`tags-wrapper ${open && "tags-open"}`}
        onClick={(e) => {
          if (!e.target.className.includes("tag ")) setOpen(!open);
        }}
      >
        <div id={`title-wrapper-${title}`} className="title-wrapper">
          <label id={`title-${title}`}>{title}</label>
        </div>
        <div className="tags-container">
          {tags.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  toggleTag(item);
                }}
                className={`tag ${
                  filters[id].includes(item) ? "included" : ""
                }`}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
