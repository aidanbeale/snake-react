import React from "react";

import "./Tile.css"

const Tile = ({column, row}) => {
  const tileWidth = 25;
  const tileHeight = 25;

  const tileStyle = {
    left: column * tileHeight,
    top: row * tileWidth,
    height: tileHeight,
    width: tileWidth
  }

  return <div className="tile" style={tileStyle}></div>;
};

export default Tile;
