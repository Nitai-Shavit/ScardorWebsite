import { useLocation, useNavigate } from "react-router-dom";
import "./ClassPageAdmin.css";
import { useEffect, useState } from "react";
import IconText from "../../../SubComponents/IconText/IconText";
import ApiHandler from "../../../Hooks/ApiHandler";

export default function ClassPageAdmin() {
  const imageLocation = "http://localhost:8080/assets";
  const location = useLocation();
  const navigator = useNavigate();

  const { data, loading, error, setOp } = ApiHandler();

  const [newTag, setNewTag] = useState("");

  const [job, setJob] = useState({
    legion: { image: "", desc: "" },
    pros: [],
    cons: [],
    image: "",
    tags: [],
    archType: "",
    linkSkill: {
      image: "",
      desc: "",
    },
    name: "",
    race: "",
    stat: "",
    description: "",
    filters: {
      partyRole: "",
      mobbing: 2,
      keyInput: 2,
      funding: 2,
    },
    discord: "",
  });

  useEffect(() => {
    setJob(location.state);
    setOp("/api/admin/assets");
  }, []);

  useEffect(() => {
    if (!loading) if (error) alert(error);
  }, [loading]);

  const update = () => {
    setOp(`/api/admin/updateClass?name=${job.name}`, "PUT", job);
    alert("successfully updated");
    navigator("/class", { state: data});
  };

  const handleChange = (key, subkey, value) => {
    setJob(
      subkey === ""
        ? { ...job, [key]: value }
        : {
            ...job,
            [key]: {
              ...job[key],
              [subkey]: value,
            },
          }
    );
  };

  return (
    <div className="class-page-wrapper">
      <div className="top-bar">
        <img
          className="class-image"
          src={`${imageLocation}/class-images/${job.image}`}
          alt={job.image}
        />
        <div className="short-info">
          <IconText
            style={{ height: "30%" }}
            fontSize="1.7vmin"
            content={
              <select
                style={{ width: "60%" }}
                value={job.stat}
                onChange={(e) => handleChange("stat", "", e.target.value)}
              >
                {data?.content
                  ?.find((i) => i.id === "stats")
                  .value.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            }
            title="Main Stat:"
          />
          <IconText
            style={{ height: "30%" }}
            fontSize="1.7vmin"
            content={
              <select
                style={{ width: "60%" }}
                value={job.race}
                onChange={(e) => handleChange("race", "", e.target.value)}
              >
                {data?.content
                  ?.find((i) => i.id === "races")
                  .value.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            }
            title="Race:"
          />
          <IconText
            style={{ height: "30%" }}
            fontSize="1.7vmin"
            content={
              <select
                style={{ width: "60%" }}
                value={job.archType}
                onChange={(e) => handleChange("archType", "", e.target.value)}
              >
                {data?.content
                  ?.find((i) => i.id === "types")
                  .value.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            }
            title="Job Type:"
          />
          <a
            className="discord-container"
            href={job.discord}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="discord"
              src={`${imageLocation}/images/discord.png`}
              alt="discord"
            />
          </a>
        </div>
        <div className="extended-info">
          <IconText
            style={{
              height: "100%",
              width: "32%",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
            src={`${imageLocation}/link-images/${job.linkSkill?.image}`}
            alt={job.linkSkill?.image}
            content={
              <textarea
                style={{ height: "80%", width: "90%", resize: "none" }}
                value={job.linkSkill?.desc}
                onChange={(e) =>
                  handleChange("linkSkill", "desc", e.target.value)
                }
              />
            }
            title="Link:"
          />
          <IconText
            style={{
              height: "100%",
              width: "32%",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
            src={`${imageLocation}/legion-images/${job.legion?.image}`}
            alt={job.linkSkill?.image}
            content={
              <textarea
                style={{ height: "80%", width: "90%", resize: "none" }}
                value={job.legion?.desc}
                onChange={(e) => handleChange("legion", "desc", e.target.value)}
              />
            }
            title="Legion:"
          />
          <IconText
            style={{
              height: "100%",
              width: "32%",
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
            }}
            content={
              <textarea
                style={{ height: "80%", width: "90%", resize: "none" }}
                value={job.description}
                onChange={(e) =>
                  handleChange("description", "", e.target.value)
                }
              />
            }
            title="Description:"
          />
        </div>
      </div>
      <div className="content">
        <div className="side-bar">
          <IconText
            style={{
              height: "5%",
              flexDirection: "row",
              width: "100%",
              borderBottom: "1px solid black",
            }}
            content={
              <input
                style={{ width: "70%" }}
                value={job.name}
                onChange={(e) => handleChange("name", "", e.target.value)}
              />
            }
            title="Class:"
          />
          <div className="ratings">
            <IconText
              style={{
                flexDirection: "row",
                width: "100%",
                height: "10%",
              }}
              content={
                <button
                  style={{
                    width: "20%",
                    height: "100%",
                  }}
                  onClick={() =>
                    handleChange(
                      "filters",
                      "funding",
                      (job.filters.funding % 2) + 1
                    )
                  }
                >
                  {job.filters.funding === 1 ? "yes" : "no"}
                </button>
              }
              title="Funding:"
            />
            <IconText
              style={{
                flexDirection: "row",
                width: "100%",
                height: "10%",
              }}
              content={
                <button
                  style={{
                    width: "20%",
                    height: "100%",
                  }}
                  onClick={() =>
                    handleChange(
                      "filters",
                      "keyInput",
                      (job.filters.keyInput % 2) + 1
                    )
                  }
                >
                  {job.filters.keyInput === 1 ? "yes" : "no"}
                </button>
              }
              title="Key Input:"
            />
            <IconText
              style={{
                flexDirection: "row",
                width: "100%",
                height: "10%",
              }}
              content={
                <button
                  style={{
                    width: "20%",
                    height: "100%",
                  }}
                  onClick={() =>
                    handleChange(
                      "filters",
                      "mobbing",
                      (job.filters.mobbing % 2) + 1
                    )
                  }
                >
                  {job.filters.mobbing === 1 ? "yes" : "no"}
                </button>
              }
              title="Mobbing:"
            />
          </div>
          <div className="tags">
            Tags:
            <div className="tags-container">
              {job.tags?.map((item, index) => (
                <label
                  onClick={() => {
                    handleChange("tags", "", [
                      ...job.tags.slice(0, index),
                      ...job.tags.slice(index + 1, job.tags.length),
                    ]);
                  }}
                >
                  {" "}
                  {item}
                </label>
              ))}
            </div>
            <div>
              <input
                placeholder="add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                onClick={() => {
                  handleChange("tags", "", [...job.tags, newTag]);
                  setNewTag("");
                }}
              >
                add tag
              </button>
            </div>
          </div>

          <button className="update" onClick={update}>
            update
          </button>
        </div>
        <div className="info"></div>
      </div>
    </div>
  );
}
