import { React, useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  handleTileClick,
  initializeBoard,
  getCurrentBoardState,
  resetBoard,
  checkIfComplete,
} from "./gameLogic";

function Gameboard(props) {
  const { updateScore, isComplete, setCompleteToTrue } = props;
  const { width, height } = useWindowSize();

  useEffect(() => {
    initializeBoard();
  }, []);
  let tiles = [];
  //create tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(i + 1);
  }

  function tileClick(e) {
    if (handleTileClick(e)) {
      updateScore();
      if (checkIfComplete()) {
        setCompleteToTrue();
      }
    }
  }

  return (
    <div className="gameSquare">
      {isComplete && <Confetti width={width} height={height} />}
      <div id="tileContainer" className="tileContainer">
        {tiles.map((tile, index) => {
          return (
            <canvas key={index} id={tile} className="tile" onClick={tileClick}>
              {tile}
            </canvas>
          );
        })}
      </div>
      {isComplete ? (
        <div className="tileContainer winOverlay">
          <div className="winImage"></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Gameboard;
