import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2 className="instructions-header">
        How to Play
      </h2>
      <div className="instructions-keys">
        <span>
          <FontAwesomeIcon className="arrow-icon" icon={faArrowUp} />
          Move Up
        </span>
        <span>
          <FontAwesomeIcon className="arrow-icon" icon={faArrowLeft} />
          Move Left
        </span>
        <span>
          <FontAwesomeIcon className="arrow-icon" icon={faArrowDown} />
          Move Down
        </span>
        <span>
          <FontAwesomeIcon className="arrow-icon" icon={faArrowRight} />
          Move Right
        </span>
      </div>
    </div>

  );
};

export default Instructions;