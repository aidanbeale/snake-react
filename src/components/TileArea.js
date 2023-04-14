import React from "react";

import Tile from './Tile';

const TileArea = ({columns, rows}) => {
  let tiles = [];

  for (let x=0; x<rows; x++) {
    for (let y=0; y<columns; y++) {
      tiles.push(
        <Tile row={x} column={y} />
      )
    }
  }
  return <div>
    {tiles}
  </div>;
};

export default TileArea;
