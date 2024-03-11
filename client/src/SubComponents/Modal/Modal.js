import { createPortal } from "react-dom";
import "./Modal.css";

export const Modal = ({ open, onClose, children }) => {
  if (open)
    return createPortal(
      <div
        className="overlay"
        onClick={(e) => {
          e.stopPropagation();
          e.target === e.currentTarget && onClose(e);
        }}
      >
        {children}
      </div>,
      document.getElementById("modal")
    );
  else return null;
};
