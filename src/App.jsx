import { useEffect, useState } from "react";
import "./App.css";
import CopyrightFooter from "./components/CopyrightFooter";
import {
  handleTileClick,
  initializeBoard,
  getCurrentBoardState,
  resetBoard,
} from "./scripts/gameLogic";

function App() {
  useEffect(() => {
    initializeBoard();
  }, []);
  let tiles = [];
  //create tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(i);
  }
  return (
    <div className="App">
      <div className="container pageWrapper">
        {/* Navigation */}
        <nav className="navbar myNav center">
          <p>PicPuzzler</p>
        </nav>
        {/* Main Content */}
        <div className="mainContent">
          <div className="scoreWrapper center"> Score : 0</div>
          <div className="gameSquare">
            <div id="tileContainer" className="tileContainer">
              {tiles.map((tile, index) => {
                return (
                  <canvas
                    key={index}
                    id={tile}
                    className="tile"
                    onClick={handleTileClick}
                  >
                    {tile}
                  </canvas>
                );
              })}
            </div>
          </div>
          <div className="gameButtons">
            <button className="btn btn-lg btn-warning" onClick={resetBoard}>
              Reset
            </button>
            <button
              className="btn btn-lg btn-success"
              onClick={getCurrentBoardState}
            >
              Get Board
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="footer center">
          <CopyrightFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
