import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { correct, questions, startAgain, isModelOpen } = useGlobalContext();
  return (
    <div
      className={`${
        isModelOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className={"modal-content"}>
        <h1>Congratulation!!!</h1>
        <h3>
          {((correct / questions.length) * 100).toFixed(0)}% of your answer are
          correct
        </h3>
        <button onClick={() => startAgain()} className={"close-btn"}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
