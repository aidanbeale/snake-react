import React from "react";
import "./Score.css";

const Score = ({ score }) => {
  return (
    <div className="score-wrapper">
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default Score;