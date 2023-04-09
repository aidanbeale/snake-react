import React from "react";
import "./Menu.css";

const Menu = ({ startGame }) => {
  return (
    <div className="wrapper">
      <div>
        <input
          onClick={startGame}
          className={"start"}
          type="button"
          value={"start game"}
        />
      </div>
    </div>
  );
};

export default Menu;