import { useLocation } from "react-router-dom";
import "./ClassPage.css";
import { useEffect, useState } from "react";
import IconText from "../../../SubComponents/IconText/IconText";

export default function ClassPage() {
  const imageLocation = "http://localhost:8080/assets";
  const location = useLocation();
  const [job, setJob] = useState({});

  useEffect(() => {
    setJob(location.state);
  }, []);

  return (
    <div className="class-page-wrapper">
      <div className="top-bar">
        <img
          className="class-image"
          src={`${imageLocation}/class-images/${job.image}`}
          alt={job.image}
        />
        <div className="short-info">
          <IconText content={job.stat} title="Main Stat:" />
          <IconText content={job.race} title="Race:" />
          <IconText content={job.archType} title="Job Type:" />
          <img
            className="discord"
            src={`${imageLocation}/images/discord.png`}
            alt="discord"
            onClick={() => (null)}
          />
        </div>
        <div className="extended-info">
          <IconText
            style={{ height: "100%" }}
            src={`${imageLocation}/link-images/${job.linkSkill?.image}`}
            alt={job.linkSkill?.image}
            content={job.linkSkill?.desc}
            title="Link:"
          />
          <IconText
            style={{ height: "100%" }}
            src={`${imageLocation}/legion-images/${job.legion?.image}`}
            alt={job.linkSkill?.image}
            content={job.legion?.desc}
            title="Legion:"
          />
          <IconText
            style={{ height: "100%" }}
            content={job.description}
            title="Description:"
          />
        </div>
      </div>
      <div className="content">
        <div className="side-bar">
          <IconText
            style={{
              height: "5%",
              width: "100%",
              borderBottom: "1px solid black",
            }}
            content={job.name}
            title="Class:"
          />
          <div className="relevant-links"></div>
          <div className="tags">
            Tags:
            {job.tags?.map((item) => (
              <label> {item}</label>
            ))}
          </div>
        </div>
        <div className="info"></div>
      </div>
    </div>
  );
}
