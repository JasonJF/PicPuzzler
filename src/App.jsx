import { useEffect, useState } from "react";
import "./App.css";
import { handleTileClick, initializeBoard } from "./scripts/gameLogic";

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
            <button className="btn btn-lg btn-warning">Reset</button>
          </div>
        </div>
        {/* Footer */}
        <div className="footer center">
          <p>Copyright Jason JF</p>
        </div>
      </div>
    </div>
  );
}

export default App;
