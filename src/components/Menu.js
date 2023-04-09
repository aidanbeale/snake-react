import React from "react";
import "./Menu.css";

const Menu = ({ startGame, gameOver, score }) => {
  return (
    <div className="wrapper">
      {gameOver ? (
        <div>
          <p className="game-over">GAME OVER</p>
          <p className="score game-over-score">Score: {score}</p>
        </div>
      ) : null}
      <div>
        <input
          onClick={startGame}
          className={`start ${gameOver ? ("restart") : ""}`}
          type="button"
          value={gameOver ? ("restart") : ("start game")}
        />
      </div>
    </div>
  );
};

export default Menu;