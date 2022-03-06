import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import handleTileClick from "./scripts/gameLogic";

function App() {
  let tiles = [];
  //create tiles
  for (let i = 0; i < 9; i++) {
    tiles.push(i);
  }
  return (
    <div className="App">
      <div class="container pageWrapper">
        {/* Navigation */}
        <nav class="navbar myNav center">
          <p>PicPuzzler</p>
        </nav>
        {/* Main Content */}
        <div class="mainContent">
          <div class="scoreWrapper center"> Score : 0</div>
          <div class="gameSquare">
            <div id="tileContainer" class="tileContainer">
              {tiles.map((tile) => {
                return (
                  <canvas id={tile} class="tile" onClick={handleTileClick}>
                    {tile}
                  </canvas>
                );
              })}
            </div>
          </div>
          <div class="gameButtons">
            <button class="btn btn-lg btn-warning">Reset</button>
          </div>
        </div>
        {/* Footer */}
        <div class="footer center">
          <p>Copyright Jason JF</p>
        </div>
      </div>
    </div>
  );
}

export default App;
