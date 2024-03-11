import { useState } from "react";
import Card from "../../SubComponents/JS/Card";
import "AccordionMenu.css";
import ClassModal from "../ClassModal/ClassModal";
export default function AccordionMenu({ title, content }) {
  const [isShow, setShow] = useState(false);
  const [isModal, setModal] = useState(false);
  const [chosenContent, setChosenContent] = useState("");

  return (
    <div className="accordion-container">
      <div className="accordion">
        <div className="title" onClick={() => setShow(!isShow)}>
          <span className="title">{title}</span>
        </div>
        <div className={isShow ? "content show" : "content"}>
          {content.map((item, index) => {
            return (
              <Card
                text={item}
                action={() => {
                  setChosenContent(item);
                  setModal(true);
                }}
                style={{ height: `${100 / content.length}% ` }}
              />
            );
          })}
        </div>
      </div>
      <ClassModal
        isOpen={isModal}
        setOpen={setModal}
        className={chosenContent}
      />
    </div>
  );
}
