import { useState } from "react";
import "./ClassCardModal.css";
import ClassModal from "./NormalMode/ClassModal";
import { Modal } from "../../SubComponents/Modal/Modal";
import { useNavigate } from "react-router-dom";
import useToggle from "../../Hooks/useToggle";
export default function ClassCardModal({ job, admin }) {
  const [open, setOpen] = useToggle();

  const navigator = useNavigate();

  return (
    <div
      id={`card-${job.name}`}
      className="class-card"
      onClick={(e) => {
        if (admin) navigator("/class", { state: job });
        else e.currentTarget.id === `card-${job.name}` && setOpen(true);
      }}
    >
      <img
        className="background-img"
        src={`http://localhost:8080/assets/class-images/${job.image}`}
        alt={job.image}
      />
      <label className="class-title">{job.name}</label>
      <Modal open={open} onClose={setOpen}>
        <ClassModal
          job={job}
          onClose={(e) => e.target.id !== `card-${job.name}` && setOpen()}
        />
      </Modal>
    </div>
  );
}
