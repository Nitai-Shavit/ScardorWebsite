import { useContext } from "react";
import { AuthContext } from "../../Components/GlobalStates/Authstate";
import configData from "../../config.json";

import "./ClassCard.css";
import { useNavigate } from "react-router-dom";
export default function ClassCard({ job }) {
  const {authState} = useContext(AuthContext);
  const navigator = useNavigate();

  return (
    <div
      id={`card-${job.name}`}
      className="class-card"
      onClick={() => {
        if (authState.authorization >= 2) {
          navigator("/class", { state: job });
        }
      }}
    >
      <img
        className="background-img"
        src={`${configData.SERVER_URL}/assets/class-images/${job.image}`}
        alt={job.image}
      />
      <label>{job.name}</label>
    </div>
  );
}
