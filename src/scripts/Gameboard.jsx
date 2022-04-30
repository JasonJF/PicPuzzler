import { React, useState, useEffect } from "react";
import {
  handleTileClick,
  initializeBoard,
  getCurrentBoardState,
  resetBoard,
  checkIfComplete,
} from "./gameLogic";

function Gameboard(props) {
  const { updateScore, isComplete } = props;

  useEffect(() => {
    initializeBoard();
  }, []);
  let tiles = [];
  //create tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(i);
  }

  function tileClick(e) {
    if (handleTileClick(e)) {
      updateScore();
      if (checkIfComplete()) {
        isComplete();
      }
    }
  }

  return (
    <div className="gameSquare">
      <div id="tileContainer" className="tileContainer">
        {tiles.map((tile, index) => {
          return (
            <canvas key={index} id={tile} className="tile" onClick={tileClick}>
              {tile}
            </canvas>
          );
        })}
      </div>
    </div>
  );
}

export default Gameboard;
