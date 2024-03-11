import IconText from "../../../SubComponents/IconText/IconText";
import "./ClassModal.css";
import configData from "../../../config.json"

export default function ClassModal({ job, onClose }) {
  return (
    <div className="class-card-wrapper">
      <div className="close-button">
        <span onClick={(e) => {
          e.stopPropagation();
          onClose(e);
        }}>X</span>
      </div>
      <div className="top-half">
        <div className="top-left bubble-container">
          <IconText
            style={{ height: "20%" }}
            src={`${configData.SERVER_URL}/assets/legion-images/${job.legion.image}`}
            alt={job.linkSkill.image}
            content={job.legion.desc}
            title="Legion:"
          />
          <IconText
            style={{ height: "60%" }}
            src={`${configData.SERVER_URL}/assets/link-images/${job.linkSkill.image}`}
            alt={job.linkSkill.image}
            content={job.linkSkill.desc}
            title="Link:"
          />
          <IconText
            style={{ height: "20%" }}
            content={job.description}
            title="Description:"
          />
          <div className="tags">
            Tags:
            {job.tags.map((item, index) => (
              <label key={index} > {item}</label>
            ))}
          </div>
        </div>
        <div className="top-right ">
          <img
            className="bubble-container"
            src={`${configData.SERVER_URL}/assets/class-images/${job.image}`}
            alt={job.image}
          />
          <div className="main-details bubble-container">
            <IconText
              style={{ width: "35%", flexDirection: "row" }}
              content={job.name}
              title="Job:"
            />
            <IconText
              style={{ width: "50%", flexDirection: "row" }}
              content={job.archType}
              title="Job Type:"
            />
            <IconText
              style={{ width: "35%", flexDirection: "row" }}
              content={job.race}
              title="Race:"
            />
            <IconText
              style={{ width: "50%", flexDirection: "row" }}
              content={job.stat}
              title="Main Stat:"
            />
          </div>
        </div>
      </div>
      <div className="bottom-half">
        <div className="bottom-left bubble-container">
          <label className="title">pros</label>
          <ul>
            {job.pros.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bottom-right bubble-container">
          <label className="title">cons</label>
          <ul>
            {job.cons.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
